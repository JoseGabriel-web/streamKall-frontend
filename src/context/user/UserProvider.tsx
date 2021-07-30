import { childrenProp, updateUserType, userInterface } from "@customTypes";
import { createContext, FC, useContext, useState } from "react";

interface userContextInterface {
  user: userInterface;
  updateUser: updateUserType;
}

const defaultUser: userInterface = {
  name: "",
  id: "",
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
  const [user, setUser] = useState<userInterface>({ name: "", id: "" });

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
