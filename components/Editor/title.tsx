"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { useRef, useState } from "react";

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {

  const inputRef = useRef<HTMLInputElement>(null);



  const [isEditing, setIsEditing] = useState(false);


  const disableInput = () => {
    setIsEditing(false);
  };

  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  };

  const onkeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={()=>{}}
          onBlur={disableInput}
          onChange={OnChange}
          onKeyDown={onkeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={() =>{}}
          variant={"ghost"}
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-6 w-20 rounded-md" />;
};
