import { FC } from "react";

export interface screenInterface {
  label: string;
  path: string;
  exact: boolean;
  Component: FC<any>;
}

export interface layoutProps {
  children: React.ReactNode;
}
export interface childrenProp {
  children: React.ReactNode;
}

export interface controlBtnInterface {
  svg: string,
  alternateSvg?: string,
  state: boolean,
  callback?:  () => void,
  size?: string
}

export interface messageInterface {
  sender: string,
  date: Date | number,
  message: string
}

export type updateUserType = (userObject: userInterface) => void;

export interface userInterface {
  name: string;
  id: string
}

export type updateRoomType = (roomObject: roomInterface) => void;

export interface roomInterface {
  name: string;
  participants: userInterface[];
}

export interface roomContextInterface {
  room: roomInterface;
  updateRoom: updateRoomType;
}

export interface announcementInterface {
  text: string
}

// update userInterface in frontend and backend