import { FC } from "react";
import styles from "@styles/components/sidePanel/participant.module.scss";
import ControlBtn from "@components/controls/ControlBtn";
import { CameraVideo, CameraVideoOff, Mic, MicMute } from "react-bootstrap-icons";

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
          <h4>{name && name.split("")[0].toUpperCase()}</h4>
        </div>
      </div>
      <div className={styles.name}>
        <h5>{name && name}</h5>
      </div>
      <div className={styles.participantMedia}>
        <ControlBtn
          key={"participants - videoSvg"}
          Svg={CameraVideo}
          AlternateSvg={CameraVideoOff}
          state={video}
          size="80%"
        />
        <ControlBtn
          key={"participants - audioSvg"}
          Svg={Mic}
          AlternateSvg={MicMute}
          state={audio}
          size="80%"
        />
      </div>
    </div>
  );
};

export default Participant;
