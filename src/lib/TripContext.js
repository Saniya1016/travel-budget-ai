"use client";

import { useState, useContext, createContext } from "react";

const TripContext = createContext();

export const TripProvider = ({children}) => {

    const [currentTrip, setCurrentTrip] = useState(null);

    return (
        <TripContext.Provider value={{currentTrip, setCurrentTrip}}>
            {children}
        </TripContext.Provider>
    );
}

export const useTrip = () => useContext(TripContext);
