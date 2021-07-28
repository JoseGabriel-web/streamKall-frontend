import { FC } from "react";
import styles from "@styles/components/sidePanel/chat.module.scss";

const Chat: FC = () => {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.message}>
        <div className={styles.iconContainer}>
          <div className={styles.userIcon} />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.nameAndTime}>
            <div className={styles.name}>
              <h5>jose gabriel</h5>
            </div>
            <div className={styles.time}>
              <small>11:48pm</small>
            </div>
          </div>
          <div className={styles.messageText}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam minus sit nulla aperiam eaque deleniti explicabo ipsum unde deserunt laborum voluptates molestiae, nobis nisi quidem sequi omnis rerum possimus pariatur!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
