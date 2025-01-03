"use client";

import { SettingsModal } from "@/components/modals/settings-model";

import React, { useEffect, useState } from "react";
import { ExportModal } from "@/components/modals/export-modal";
import { ImportModal } from "@/components/modals/import-modal";


export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />


    </>
  );
};
