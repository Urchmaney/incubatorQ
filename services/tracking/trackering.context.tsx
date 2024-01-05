import React, { useMemo } from "react";
import IProductTracking from "./IProductTracking";
import { MixpanelTracker } from "./mixpanel/tracker";

export const TrackingContext: React.Context<{ tracker?: IProductTracking }> = React.createContext({});

export const useTrackingContext = () => React.useContext(TrackingContext);

export const TrackingContextProvider = ({
    children,
}: { children: React.ReactNode }) => {
    
    const productTracker : IProductTracking = useMemo(() => {
      return MixpanelTracker.getInstance()}
      , []);

    return (
        <TrackingContext.Provider value={{ tracker: productTracker }}>
          {children}
        </TrackingContext.Provider>
    );
};