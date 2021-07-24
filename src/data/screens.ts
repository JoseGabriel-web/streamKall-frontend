import HomeScreen from "@screens/HomeScreen";
import RoomScreen from "@screens/RoomScreen";
import { screenInterface } from "src/types/customTypes";

const screens: screenInterface[] = [
  {
    label: "home",
    path: "/home",
    exact: true,
    Component: HomeScreen,
  },
  {
    label: "room",
    path: "/room",
    exact: false,
    Component: RoomScreen,
  },
];

export default screens;
