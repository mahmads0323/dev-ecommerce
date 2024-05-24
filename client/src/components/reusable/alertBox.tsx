import { useEffect, useState } from "react";
import useContextStore from "../context/cartContext";

type AlertBoxProps = {
  portalContainer: HTMLElement | null;
  element: HTMLDivElement;
  message: string;
  boxType: "failure" | "success";
};

const AlertBox = ({
  portalContainer,
  element,
  message,
  boxType,
}: AlertBoxProps) => {
  const [AlertBoxOpen, setAlertBoxOpen] = useState(true);
  const contextStore = useContextStore();

  /// if user do not cancel alert, then it will cancelled automatically
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (AlertBoxOpen) {
        const filteredMessages = contextStore.alertMessages.filter(
          (alertMessage:AlertBoxProps) => alertMessage.message !== message
        );
        contextStore.setAlertMessages(filteredMessages);
        setAlertBoxOpen(false);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleCrossButtonClick = () => {
    setAlertBoxOpen(false);
    portalContainer?.removeChild(element);
    const filteredMessages = contextStore.alertMessages.filter(
      (alertMessage:AlertBoxProps) => alertMessage.message !== message
    );
    contextStore.setAlertMessages(filteredMessages);
  };

  return (
    <div
      className={`${
        boxType == "failure" ? "bg-red-600" : "bg-green-600"
      } flex w-[90%] justify-between px-4 rounded-md p-2 text-sm md:text-lg`}
    >
      <p>{message}</p>
      <button onClick={handleCrossButtonClick} className="font-bold">
        x
      </button>
    </div>
  );
};

export default AlertBox;
