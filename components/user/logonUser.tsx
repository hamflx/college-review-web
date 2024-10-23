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
  const [userId, setUserId] = useState<string>(userList[0].login);
  const currentUser = userList.find((u) => u.login === userId)!;
  const switchUser = (user: UserProfile) => {
    setUserId(user.login);
  };
  const consumeBalance = (amount: number) => {
    if (currentUser.balance - amount < 0) {
      return false;
    }
    const newUser = produce(currentUser, (draft) => {
      draft.balance -= amount;
    });

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
    <LogonUserContext.Provider
      value={{ ...currentUser, switchUser, consumeBalance }}
    >
      {children}
    </LogonUserContext.Provider>
  );
};
