"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Settings2,
  SquareTerminal,
  Trash,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";

import { FuncSwitcher } from "./func-switcher";
import { usePDFHighlight } from "@/hooks/use-pdf-highlight";
import DictionaryCard from "./func-module/dictionary-card";



// Data with component references
const data = {
  funcs: [
    {
      id: 1,
      name: "Language Support",
      logo: GalleryVerticalEnd,
      component: DictionaryCard, // Component for Language Support
    },
    {
      id: 2,
      name: "AI Chat",
      logo: AudioWaveform,
      component: () => <div>AudioWaveform Content</div>,       // Component for AI Chat
    },
    {
      id: 3,
      name: "Lecture Support",
      logo: Command,
      component: () => <div>Lecture Support Content</div>, // Placeholder component
    },
  ],
};

export function FuncSidebar({ ...props }) {
  const selectedText = usePDFHighlight((state) => state.selectedText);
  const [funcId, setFuncId] = React.useState(1);

  const handleFuncChange = (id: number) => {
    setFuncId(id);
  };

  const SelectedComponent = data.funcs.find(func => func.id === funcId)?.component;

  return (
    <SidebarProvider defaultOpen={false} sidebarWidth="27rem">
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <FuncSwitcher funcs={data.funcs} onFuncChange={handleFuncChange} />
        </SidebarHeader>
        <SidebarContent>
          {/* Dynamically render the selected component */}
          {SelectedComponent && <SelectedComponent text={selectedText} />}
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}