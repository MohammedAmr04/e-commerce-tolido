"use client";

import React, { createContext} from "react";
import { DarkLightProvider } from "./DarkLightProvider";
import { AntDProvider } from "./AntDProvider";
import { ColorsProvider } from "./ColorsProvider";
import useUserCountry from "../hooks/useUserCountry";

interface UiContextType {
  country: string | null;
}

const UiContext = createContext<UiContextType>({ country: null });



const UiProvider: React.FC<{ children: React.ReactNode; isArabic: boolean }> = ({
  children,
  isArabic,
}) => {
  const country = useUserCountry(); 

  return (
    <UiContext.Provider value={{ country }}>
      <DarkLightProvider>
        <ColorsProvider>
          <AntDProvider isArabic={isArabic}>{children}</AntDProvider>
        </ColorsProvider>
      </DarkLightProvider>
    </UiContext.Provider>
  );
};

export default UiProvider;
