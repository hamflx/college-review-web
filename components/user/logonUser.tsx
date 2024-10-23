"use client";

import { createContext, ReactNode, useState } from "react";
import { produce } from "immer";

import { UserProfile } from "./types";
import { fakeUserList } from "./userData";

import { useLocalStorage } from "@/hooks/storage";
import { StorageKeyUsers } from "@/constants/storageKeys";

export interface UserProfileContext extends UserProfile {
  switchUser: (user: UserProfile) => void;
  consumeBalance: (amount: number) => boolean;
}

export const LogonUserContext = createContext<UserProfileContext>({
  ...fakeUserList[0],
  switchUser: () => {},
  consumeBalance: (_: number) => false,
});

export const LogonUserContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userList, setUserList] = useLocalStorage<UserProfile[]>(
    StorageKeyUsers,
    fakeUserList,
  );
  const [user, setUser] = useState<UserProfile>(userList[0]);
  const switchUser = (user: UserProfile) => {
    setUser(userList.find((u) => u.login === user.login)!);
  };
  const consumeBalance = (amount: number) => {
    if (user.balance - amount < 0) {
      return false;
    }
    const newUser = produce(user, (draft) => {
      draft.balance -= amount;
    });

    setUser(newUser);
    setUserList(
      userList.map((u) => {
        if (u.login === newUser.login) {
          return newUser;
        }

        return u;
      }),
    );

    return true;
  };

  return (
    <LogonUserContext.Provider value={{ ...user, switchUser, consumeBalance }}>
      {children}
    </LogonUserContext.Provider>
  );
};
