
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,

  MoreHorizontal,
  Trash,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";




export const Menu = () => {

  const { user } = useUser();



  const onArchive = () => {



  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <ArrowUpFromLine className="h-4 w-4 mr-2" />
          Import
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <ArrowDownFromLine className="h-4 w-4 mr-2" />
          Export
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
