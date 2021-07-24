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