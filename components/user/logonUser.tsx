"use client";

import { createContext, ReactNode, useState } from "react";

import { UserProfile } from "./types";
import { fakeUserList } from "./userData";

export interface UserProfileContext extends UserProfile {
  switchUser: (user: UserProfile) => void;
}

export const LogonUserContext = createContext<UserProfileContext>({
  ...fakeUserList[0],
  switchUser: () => {},
});

export const LogonUserContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<UserProfile>(fakeUserList[0]);
  const switchUser = (user: UserProfile) => setUser(user);

  return (
    <LogonUserContext.Provider value={{ ...user, switchUser }}>
      {children}
    </LogonUserContext.Provider>
  );
};
