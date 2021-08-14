import styles from "@styles/components/sidePanel/chatInput.module.scss";
import ControlBtn from "@components/controls/ControlBtn";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useRef, useState } from "react";
import useClickLocation from "@hooks/useClickLocation";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRoomContext } from "@context/room/RoomProvider";
import { ArrowRight, EmojiSmile } from "react-bootstrap-icons";

const ChatInput = () => {
  const socket = useSocketIo();
  const { room } = useRoomContext();
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const closePicker = () => {
    setIsPickerOpen(false);
  };

  const pickerRef = useRef(null);
  useClickLocation(pickerRef, closePicker);

  const onEmojiClick: (event: React.MouseEvent, data: IEmojiData) => void = (
    _,
    emojiObject,
  ) => {
    setChosenEmoji(emojiObject);
    setMessage(message + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => setIsPickerOpen((prev) => !prev);

  const emitMessage = () => {
    if (!room.name) return;
    if (message === "") return;
    socket.emit("chat:send", { message, roomName: room.name });
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!room.name) return;
    if (e.key === "Enter") {
      emitMessage();
    } else {
      socket.emit("chat:typing", {});
    }
  };

  return (
    <div className={styles.chatInput}>
      <div ref={pickerRef} className={styles.emojiPickerContainer}>
        <span style={{ display: isPickerOpen ? "block" : "none" }}>
          <Picker
            native
            disableAutoFocus={true}
            groupNames={{ smileys_people: "PEOPLE", recently_used: "RECENT" }}
            onEmojiClick={onEmojiClick}
            groupVisibility={{}}
            pickerStyle={{
              position: "absolute",
              top: "0",
              left: "0",
              marginLeft: "10px",
              transform: "translateY(calc(-100% + -10px))",
              maxWidth: "100%",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          />
        </span>

        <ControlBtn
          Svg={EmojiSmile}
          state={false}
          callback={toggleEmojiPicker}
        />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          tabIndex={0}
        />
      </div>

      <div className={styles.sendIconContainer}>
        <ControlBtn state={false} Svg={ArrowRight} callback={emitMessage} />
      </div>
    </div>
  );
};

export default ChatInput;
