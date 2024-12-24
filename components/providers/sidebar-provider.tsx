import React from "react";
import { MainSidebar } from "@/components/sidebar/main-sidebar";
import { FuncSidebar } from "@/components/sidebar/func-sidebar/func-sidebar";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex">
      <div >
        <MainSidebar />
      </div>
      {children}
      <div >
        <FuncSidebar side="right" />
      </div>
    </div>
  );
};

export default SidebarProvider;
