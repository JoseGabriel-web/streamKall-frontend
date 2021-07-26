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
  callback?:  () => void
}