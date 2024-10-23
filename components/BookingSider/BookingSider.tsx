"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useContext } from "react";
import { User } from "@nextui-org/user";

import { LogonUserContext } from "../user/logonUser";

export const BookingSider = () => {
  const profile = useContext(LogonUserContext);

  return (
    <div className="absolute right-0 top-0 px-6 bottom-0">
      <Card className="max-w-[400px] h-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <div className="text-md">
              <User
                avatarProps={{ src: profile.avatar }}
                name={profile.login}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <p className="w-80">账户余额：{profile.balance}</p>
        </CardBody>
      </Card>
    </div>
  );
};
