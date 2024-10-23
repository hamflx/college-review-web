"use client";

import { Avatar } from "@nextui-org/avatar";
import { useContext } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";

import { LogonUserContext } from "./user/logonUser";
import { fakeUserList } from "./user/userData";

export const LogonUser = () => {
  const userProfile = useContext(LogonUserContext);

  const userElements = fakeUserList.map((user) => {
    return (
      <DropdownItem key={user.login} aria-label={user.login}>
        <User avatarProps={{ src: user.avatar }} name={user.login} />
      </DropdownItem>
    );
  });

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer"
          name={userProfile.login}
          src={userProfile.avatar}
        />
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => {
          userProfile.switchUser(fakeUserList.find((i) => i.login === key)!);
        }}
      >
        {userElements}
      </DropdownMenu>
    </Dropdown>
  );
};
