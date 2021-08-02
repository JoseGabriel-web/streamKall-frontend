import { controlBtnInterface } from "@customTypes";
import { FC } from "react";

const ControlBtn: FC<controlBtnInterface> = ({
  svg,
  alternateSvg,
  state,
  callback,
  size,
  disabled
}) => {
  const handleClick = () => {
    if (callback) {
      callback();
    }
  };

  return (
    <button
      style={{ cursor: "pointer" }}
      onClick={() => handleClick()}
      disabled={disabled}
    >
      <img
        src={alternateSvg && !state ? alternateSvg : svg}
        height={size ? size : "70%"}
        width={size ? size : "70%"}
        style={{ maxWidth: "25px", maxHeight: "25px" }}
      />
    </button>
  );
};

export default ControlBtn;
