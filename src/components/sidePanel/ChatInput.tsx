import styles from "@styles/components/sidePanel/chatInput.module.scss";
import ControlBtn from "@components/controls/ControlBtn";
import emojiPickerSvg from "@assets/svg/emojiPicker.svg";
import sendSvg from "@assets/svg/send.svg";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useRef, useState } from "react";
import useClickLocation from "@hooks/useClickLocation";

const ChatInput = () => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const detectClickPicker = (clicked: boolean) => {
    if (!clicked) {
      setIsPickerOpen(false);
    }
  };
  
  const pickerRef = useRef(null);
  useClickLocation({
    element: pickerRef.current,
    callback: detectClickPicker,
  });

  const onEmojiClick: (event: React.MouseEvent, data: IEmojiData) => void = (
    _,
    emojiObject,
  ) => {
    setChosenEmoji(emojiObject);
    setMessage(message + emojiObject.emoji)
  };

  const toggleEmojiPicker = () => setIsPickerOpen((prev) => !prev);

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
          svg={emojiPickerSvg}
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
        />
      </div>

      <div className={styles.sendIconContainer}>
        <ControlBtn state={false} svg={sendSvg} />
      </div>
    </div>
  );
};

export default ChatInput;