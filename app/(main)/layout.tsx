"use client";
import Spinner from "@/components/global/spinner";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
//TODO import SearchCommand from "@/components/search-command";
import { MainSidebar } from "@/components/sidebar/main-sidebar";
import RoleGate from "@/components/auth/role-gate";
import { UserRole } from "@/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FuncSidebar } from "@/components/sidebar/func-sidebar/func-sidebar";

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
        <MainSidebar />
        <main className="flex-1 h-full overflow-y-auto">
          {/* <SearchCommand /> */}
          {children}
        </main>
        <FuncSidebar side="right" />
      </RoleGate>
    </div>
  );
};

export default MainLayout;
