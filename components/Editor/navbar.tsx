"use client";

import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import { Title } from "./title";

import { Button } from "@/components/ui/button";
import { useExport } from "@/hooks/use-export";
import { useImport } from "@/hooks/use-import";

export const Navbar = () => {
  const exports = useExport();
  const imports = useImport();
  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-3 w-full flex items-center gap-x-4">
        <div className="flex items-center justify-between w-full">
          <Title title="title" />
          <div className="flex items-center gap-x-2">
            <Button variant={"outline"} onClick={() => imports.onOpen()}>
              <ArrowDownFromLine className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant={"outline"} onClick={() => exports.onOpen()}>
              <ArrowUpFromLine className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};
