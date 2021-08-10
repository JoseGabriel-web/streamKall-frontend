import { childrenProp, updateUserType, userInterface } from "@customTypes";
import React from "react";
import { createContext, FC, useContext, useState } from "react";

interface userContextInterface {
  user: userInterface;
  updateUser: updateUserType;
}

const defaultUser: userInterface = {
  name: "",
  id: "",
  ref: React.createRef()
};

const UserContext = createContext<userContextInterface>({
  user: defaultUser,
  updateUser: () => null,
});

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}

const UserProvider: FC<childrenProp> = ({ children }) => {
  const [user, setUser] = useState<userInterface>(defaultUser);

  function updateUser(userObject: userInterface) {
    setUser(userObject);
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
