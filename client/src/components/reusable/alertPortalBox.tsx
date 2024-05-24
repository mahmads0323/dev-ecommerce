import { useEffect } from "react";
import { createPortal } from "react-dom";
import AlertBox from "./alertBox";
import AlertPortalBoxProps from "../../types/general/alertPortalBox";


const AlertPortalBox = ({ boxType, message }: AlertPortalBoxProps) => {
  const portalContainer = document.getElementById("portal");
  portalContainer?.classList.add(
    "fixed",
    "top-5",
    "w-full",
    "flex",
    "flex-col",
    "space-y-2"
  );

  const element = document.createElement("div");
  element?.classList.add(
    "w-full",
    "flex",
    "flex-col",
    "items-center",
    "transition-all"
  );

  useEffect(() => {
    portalContainer?.appendChild(element);
  }, [portalContainer, element]);

  return createPortal(
    <AlertBox
      portalContainer={portalContainer}
      element={element}
      boxType={boxType}
      message={message}
    />,
    element
  );
};

export default AlertPortalBox;
