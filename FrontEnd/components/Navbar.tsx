import Link from "next/link";
import React from "react";
import { decrypt } from "@/lib/sessions";
import { cookies } from "next/headers";
import { logout } from "@/app/auth/actions";
import { Button } from "./ui/button";
import { MainNav } from "@/components/navbar/MainNav";
import { BottomNav } from "@/components/navbar/BottomNav";
import { TopBar } from "@/components/navbar/TopBar";

const Navbar = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  return (
    <>
      {!session ? (
        <>
          <TopBar />
          <MainNav />
          <BottomNav />
        </>
      ) : (
        <>
          <MainNav />
          <BottomNav />
        </>
      )}
    </>
  );
};

export default Navbar;
