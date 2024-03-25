import React from "react";

export const userContext = React.createContext({});

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = React.useState({});
    return (
        <userContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </userContext.Provider>
    )
}
