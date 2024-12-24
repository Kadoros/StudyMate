"use client";
import Spinner from "@/components/global/spinner";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
//TODO import SearchCommand from "@/components/search-command";
import { MainSidebar } from "@/components/sidebar/main-sidebar";
import RoleGate from "@/components/auth/role-gate";
import { UserRole } from "@/types";
import { FuncSidebar } from "@/components/sidebar/func-sidebar/func-sidebar";
import SidebarProvider from "@/components/providers/sidebar-provider";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isSignedIn) {
    return redirect("/");
  }
  return (
    <div className="h-full w-full flex dark:bg-[#1F1F1F]">
      <RoleGate allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
        {/* <Navigation /> */}

        {/* <MainSidebar/> */}
        <SidebarProvider>{children}</SidebarProvider>
        {/* <FuncSidebar side="right" /> */}
      </RoleGate>
    </div>
  );
};

export default MainLayout;
