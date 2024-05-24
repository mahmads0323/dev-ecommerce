import React, { createContext, useContext, useState } from "react";
import AlertPortalBox from "../reusable/alertPortalBox";
import AlertPortalBoxProps from "../../types/general/alertPortalBox";

const ContextStore = createContext<any | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [alertMessages, setAlertMessages] = useState<AlertPortalBoxProps[]>([]);

  return (
    <>
      <ContextStore.Provider
        value={{
          cartItems,
          setCartItems,
          alertMessages,
          setAlertMessages,
        }}
      >
        {children}
        {alertMessages.length > 0 &&
          alertMessages.map((boxPorps, index) => (
            <AlertPortalBox
              message={boxPorps.message}
              boxType={boxPorps.boxType}
              key={index}
            />
          ))}
      </ContextStore.Provider>
    </>
  );
};

const useContextStore = () => useContext(ContextStore);

export default useContextStore;
