import React, { FC } from "react";
import styles from "@styles/components/sidePanel/participant.module.scss";
import ControlBtn from "@components/controls/ControlBtn";
import videoSvg from "@assets/svg/video.svg";
import noVideoSvg from "@assets/svg/noVideo.svg";
import audioSvg from "@assets/svg/audio.svg";
import noAudioSvg from "@assets/svg/noAudio.svg";

interface props {
  name: string;
  audio: boolean;
  video: boolean;
}

const Participant: FC<props> = ({ name, audio, video }: props) => {
  return (
    <div className={styles.participant}>
      <div className={styles.iconContainer}>
        <div className={styles.userIcon}>
          <h4>{name.split("")[0].toUpperCase()}</h4>
        </div>
      </div>
      <div className={styles.name}>
        <h5>{name}</h5>
      </div>
      <div className={styles.participantMedia}>
        <ControlBtn
          key={"participants - videoSvg"}
          svg={videoSvg}
          alternateSvg={noVideoSvg}
          state={video}
          size="80%"
        />
        <ControlBtn
          key={"participants - audioSvg"}
          svg={audioSvg}
          alternateSvg={noAudioSvg}
          state={audio}
          size="80%"
        />
      </div>
    </div>
  );
};

export default Participant;
