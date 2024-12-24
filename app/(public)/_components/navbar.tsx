"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo"; 
import { ModeToggle } from "@/components/global/mode-toggle";
import { useAuth } from "@clerk/nextjs"; 
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/global/spinner";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isLoaded && <Spinner />}
        {!isSignedIn && !!isLoaded && (
          <>
            <SignInButton mode="modal" signUpForceRedirectUrl={"/"} signUpFallbackRedirectUrl={"/"}>
              <Button variant={"ghost"} size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal" signUpForceRedirectUrl={"/"} signUpFallbackRedirectUrl={"/"}>
              <Button size="sm">Get StudyMate free</Button>
            </SignInButton>
          </>
        )}
        {isSignedIn && !!isLoaded && (
          <>
            <Button variant={"ghost"} size={"sm"}>
              <Link href={"/documents"}>Enter StudyMate</Link>
            </Button>
            <UserButton/>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
