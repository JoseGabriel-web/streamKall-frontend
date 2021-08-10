import { FC, useRef, useEffect, useState } from "react";
import styles from "@styles/components/sidePanel/chat.module.scss";
import Message from "./Message";
import Announcement from "./Announcement";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { announcementInterface, messageInterface } from "@customTypes";
import { useLocation } from "react-router-dom";

interface messageComponent extends messageInterface {
  type: "message";
}
interface announcementComponent extends announcementInterface {
  type: "announcement";
}

const Chat: FC = () => {
  const { pathname } = useLocation();
  const socket = useSocketIo();
  const [typingMessage, setTypingMessage] = useState<null | string>(null);
  const [chatContent, setChatContent] = useState<
    (messageComponent | announcementComponent)[]
  >([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const addToChatContent = (
    component: messageComponent | announcementComponent,
  ) => {
    setChatContent((prevState) => [...prevState, component]);
  };

  const scrollToBottom = () => {
    if (chatRef !== null && chatRef.current !== null) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  let timeout: NodeJS.Timeout;

  socket.on("user:typing", (message: string) => {
    setTypingMessage(message);
  });

  socket.off("room:user-join").on("room:user-join", (message: string) => {
    addToChatContent({ type: "announcement", text: message });
    scrollToBottom();
  });

  socket.off("room:user-leave").on("room:user-leave", (message: string) => {
    addToChatContent({ type: "announcement", text: message });
    scrollToBottom();
  });

  socket
    .off("chat:receive")
    .on("chat:receive", ({ sender, message, date }: messageInterface) => {
      addToChatContent({ type: "message", sender, message, date });
      scrollToBottom();
    });

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setTypingMessage(null), 1000);
  }, [typingMessage]);

  useEffect(() => {
    if (pathname === "/") {
      setChatContent([]);
    }
  }, [pathname]);

  return (
    <div className={styles.chatContainer} ref={chatRef}>
      {chatContent &&
        chatContent.map((component) => {
          if (component.type === "announcement") {
            return (
              <Announcement
                key={JSON.stringify(component)}
                text={component.text}
              />
            );
          } else if (component.type === "message") {
            return (
              <Message
                key={JSON.stringify(component)}
                sender={component.sender}
                date={component.date}
                message={component.message}
              />
            );
          }
        })}
      {typingMessage && <Announcement text={typingMessage} />}
    </div>
  );
};

export default Chat;
