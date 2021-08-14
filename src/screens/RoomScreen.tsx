import { FC, useEffect, useRef, useState } from "react";
import styles from "@styles/screens/roomScreen/roomScreen.module.scss";
import { useRoomContext } from "@context/room/RoomProvider";
import { useUserContext } from "@context/user/UserProvider";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import {
  AddPeer,
  CreatePeer,
  peersMapInterface,
  roomInterface,
} from "@customTypes";
import recalculateLayout from "@helpers/recalculateLayout";
import { useHistory } from "react-router-dom";
import Peer from "simple-peer";
import { useSidePanelState } from "@context/sidePanel/SidePanelProvider";
import Video from "@components/room/Video";
import useLocalStorage from "@hooks/useLocalStorage";

const RoomScreen: FC = () => {
  const { room, updateRoom } = useRoomContext();
  const { user } = useUserContext();
  const aspectRatio = 16 / 9;
  const history = useHistory();
  const galleryRef = useRef<HTMLDivElement>(null);
  const socket = useSocketIo();
  const sidePanelState = useSidePanelState();
  const [peers, setPeers] = useState<peersMapInterface[]>([]);
  const peersRef = useRef<{ peerID: string; peer: Peer.Instance }[]>([]);
  const userVideo = useRef<HTMLVideoElement>(document.createElement("video"));
  const [startWithCamera] = useLocalStorage("startWithCamera", false);
  const [startWithMic] = useLocalStorage("startWithMic", false);

  const calculateGrid = () => {
    if (galleryRef.current === null) return;
    recalculateLayout({
      containerWidth: galleryRef.current.getBoundingClientRect().width,
      containerHeight: galleryRef.current.getBoundingClientRect().height,
      videoCount: room.participants.length,
      aspectRatio,
    });
  };

  useEffect(() => {
    if (galleryRef.current === null) return;
    calculateGrid();
    galleryRef.current.addEventListener("resize", calculateGrid);
    window.addEventListener("resize", calculateGrid);
  }, [galleryRef.current, peers]);

  useEffect(() => {
    calculateGrid();
  }, [sidePanelState]);

  /**  video and peer logic */
  useEffect(() => {
    if (room.name === "") return history.push("/");
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 1280, height: 720 },
      })
      .then((mediaStream) => {
        if (!startWithCamera) {
          mediaStream
            .getVideoTracks()
            .forEach((track) => (track.enabled = false));
        }
        if (!startWithMic) {
          mediaStream
            .getAudioTracks()
            .forEach((track) => (track.enabled = false));
        }

        userVideo.current.srcObject = mediaStream;
        calculateGrid();
        socket.emit("room:join", { room: room.name, name: user.name });
        socket.on("peer:users", (users) => {
          const peers: peersMapInterface[] = [];
          /* userID is the socketID for the user */
          users.forEach((userID: string) => {
            const peer = createPeer(userID, socket.id, mediaStream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({ peer, socketID: userID });
          });
          setPeers(peers);
        });

        socket.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, mediaStream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const socketID = getPeerSocketID(peer);

          setPeers((users) => [...users, { peer, socketID: socketID || "" }]);
        });

        socket.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item?.peer.signal(payload.signal);
        });

        socket.on("room:information", (roomData: roomInterface) => {
          /* Update room information once new user enters room */
          updateRoom({
            name: roomData.name,
            participants: roomData.participants,
          });
        });

        socket.on("peer:offline", (socketID: string) => {
          /* Remove peer and destroy it */
          removePeer(socketID);
        });

        socket.on("peer:stop:video", (socketID: string) => {
          /* Stop peer video stream */
          if (socketID === socket.id) {
            mediaStream
              .getVideoTracks()
              .forEach((track) => (track.enabled = false));
          }
        });
        socket.on("peer:start:video", (socketID: string) => {
          /* Start peer video stream */
          if (socketID === socket.id) {
            mediaStream
              .getVideoTracks()
              .forEach((track) => (track.enabled = true));
          }
        });
        socket.on("peer:mute:audio", (socketID: string) => {
          /* mute peer audio stream */
          if (socketID === socket.id) {
            mediaStream
              .getAudioTracks()
              .forEach((track) => (track.enabled = false));
          }
        });
        socket.on("peer:unmute:audio", (socketID: string) => {
          /* unmute peer audio stream */
          if (socketID === socket.id) {
            mediaStream
              .getAudioTracks()
              .forEach((track) => (track.enabled = true));
          }
        });
      })
      .catch((error) => {
        console.error(error);
        return history.push('/')
      });

    return () => {
      socket.emit("room:leave");
      socket.emit("peer:remove");
      socket.off();
    };
  }, []);

  const destroyPeer = (socketID: string) => {
    const peerOne = peersRef.current.find(({ peerID }) => peerID === socketID);
    const peerTwo = peers.find((peer) => peer.socketID === socketID);
    peerOne?.peer.destroy();
    peerTwo?.peer.destroy();
  };

  const removePeer = (socketID: string) => {
    peersRef.current = peersRef.current.filter(
      ({ peerID }) => peerID === socketID,
    );
    setPeers(peers.filter(({ socketID }) => socketID === socketID));
    destroyPeer(socketID);
  };

  const getPeerSocketID = (peerInstance: Peer.Instance) => {
    const peer = peersRef.current.find(({ peer }) => peer === peerInstance);
    if (peer) return peer.peerID;
  };

  const createPeer: CreatePeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("peer:send", { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer: AddPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("peer:return", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <div className={styles.roomScreen}>
      <div className={styles.roomGrid} ref={galleryRef}>
        <div className={styles.videoContainer} data-name={user.name}>
          <video muted ref={userVideo} height="100%" width="100%" autoPlay />
        </div>
        {peers.map(({ peer, socketID }, index) => (
          <Video key={index} peer={peer} socketID={socketID} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default RoomScreen;
