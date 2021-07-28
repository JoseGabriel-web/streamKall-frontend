import { useEffect } from "react";

interface props {
  element: HTMLElement | null;
  callback (name: boolean): any;
}

const useClickLocation = ({ element, callback }: props) => {
  useEffect(() => {
    const checkClickPosition = (e: globalThis.MouseEvent) => {
      if (element && e.composedPath) {
        const path = e.composedPath();
        const onElement = path.includes(element);
        callback(onElement)
      }
    };
    window.addEventListener("click", checkClickPosition);
    return () => window.removeEventListener("click", checkClickPosition);
  }, [element]);
};

export default useClickLocation;
