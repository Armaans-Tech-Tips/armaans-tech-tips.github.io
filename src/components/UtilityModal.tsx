import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PasswordGenerator } from "./PasswordGenerator";
import { ColorPicker } from "./ColorPicker";
import { TextConverter } from "./TextConverter";
import { QRGenerator } from "./QRGenerator";

type UtilityType = "password" | "color" | "text" | "qr";

interface UtilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  utilityType: UtilityType | null;
}

export const UtilityModal: React.FC<UtilityModalProps> = ({
  isOpen,
  onClose,
  utilityType,
}) => {
  const renderUtility = () => {
    switch (utilityType) {
      case "password":
        return <PasswordGenerator />;
      case "color":
        return <ColorPicker />;
      case "text":
        return <TextConverter />;
      case "qr":
        return <QRGenerator />;
      default:
        return null;
    }
  };

  const getUtilityTitle = () => {
    switch (utilityType) {
      case "password":
        return "Password Generator";
      case "color":
        return "Color Picker";
      case "text":
        return "Text Converter";
      case "qr":
        return "QR Code Generator";
      default:
        return "";
    }
  };

  const getUtilityDescription = () => {
    switch (utilityType) {
      case "password":
        return "Generate secure passwords with customizable options";
      case "color":
        return "Pick colors and get hex, RGB, and HSL values";
      case "text":
        return "Convert text between different cases and formats";
      case "qr":
        return "Generate QR codes for text, URLs, or any content";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getUtilityTitle()}</DialogTitle>
          <DialogDescription>
            {getUtilityDescription()}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {renderUtility()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
