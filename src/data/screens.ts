import HomeScreen from "@screens/HomeScreen";
import RoomScreen from "@screens/RoomScreen";
import { screenInterface } from "@customTypes";


const screens:screenInterface[] = [
  {
    label: "home",
    path: "/",
    exact: true,
    Component: HomeScreen,
  },
  {
    label: "room",
    path: "/room",
    exact: true,
    Component: RoomScreen,
  },
];

export default screens;
