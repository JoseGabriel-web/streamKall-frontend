import { controlBtnInterface } from "@customTypes";
import { FC } from "react";

const ControlBtn: FC<controlBtnInterface> = ({
  Svg,
  AlternateSvg,
  state,
  callback,
  size,
  disabled,
}) => {
  const handleClick = () => {
    if (callback) {
      callback();
    }
  };

  return (
    <button
      style={{
        cursor: "pointer",
      }}
      onClick={() => handleClick()}
      disabled={disabled}
    >
      <div
        style={{
          maxWidth: "25px",
          maxHeight: "25px",
          height: size ? size : "70%",
          width: size ? size : "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!state && AlternateSvg ? (
          <AlternateSvg height="100%" width="100%" />
        ) : (
          <Svg height="100%" width="100%" />
        )}
      </div>
    </button>
  );
};

export default ControlBtn;
