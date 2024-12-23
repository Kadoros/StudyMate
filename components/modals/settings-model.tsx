"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/global/mode-toggle";

export const SettingsModal = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-lg font-medium">My settings</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <Label>Appearence</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Kotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
