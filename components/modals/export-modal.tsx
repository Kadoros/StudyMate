"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useExport } from "@/hooks/use-export";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
interface ExportModalProps {
  onExport: (format: string) => Promise<string>;
}

export const ExportModal: React.FC<ExportModalProps> = ({ onExport }) => {
  // Update component signature
  const exports = useExport();
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const renderedPDF = async (mdFile: string): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    
    // Use Times-Roman which has better Unicode support than Helvetica
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSize = 12;
    const textColor = rgb(0, 0, 0);
  
    let currentPage = page;
    let y = 800; // Start near the top of the page
    const lines = mdFile.split("\n");
  
    for (const line of lines) {
      if (y < 50) {
        // Add new page if needed
        currentPage = pdfDoc.addPage([595, 842]);
        y = 800;
      }
  
      try {
        // Try to draw the text with the current encoding
        currentPage.drawText(line, {
          x: 50,
          y,
          size: fontSize,
          font,
          color: textColor
        });
      } catch (error) {
        // If encoding fails, replace problematic characters with alternatives
        const sanitizedLine = line.replace(/[→]/g, '->')
                                 .replace(/[←]/g, '<-')
                                 .replace(/[↑]/g, '^')
                                 .replace(/[↓]/g, 'v')
                                 .replace(/[•]/g, '*')
                                 .replace(/[—]/g, '-')
                                 .replace(/[""]/g, '"')
                                 .replace(/['']/g, "'");
        
        currentPage.drawText(sanitizedLine, {
          x: 50,
          y,
          size: fontSize,
          font,
          color: textColor
        });
      }
  
      y -= fontSize + 5; // Adjust line spacing
    }
  
    return await pdfDoc.save();
  };
  
  const handleExport = async () => {
    if (selectedFormat) {
      try {
        const data = await onExport(selectedFormat);
        let blob: Blob;
  
        if (selectedFormat === "pdf") {
          const pdfBytes = await renderedPDF(data);
          blob = new Blob([pdfBytes], { type: "application/pdf" });
        } else {
          blob = new Blob([data], { type: "text/plain" });
        }
  
        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `export.${selectedFormat}`;
        document.body.appendChild(link);
        link.click();
  
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        exports.onClose();
      } catch (error) {
        console.error('Export failed:', error);
        // Handle error appropriately (e.g., show error message to user)
      }
    }
  };

  return (
    <Dialog open={exports.isOpen} onOpenChange={exports.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-lg font-medium">Export note</DialogTitle>
        </DialogHeader>
        <div className="flex-col">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <Label className="text-sm font-medium">Export as</Label>
            </div>
            <Select onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="md">Markdown & CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full justify-end flex mt-3">
            <Button size={"sm"} onClick={handleExport}>
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
