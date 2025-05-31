
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  isDisabled?: boolean;
}

export function OtpInput({ length = 6, onComplete, isDisabled = false }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // Check if all digits are filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onComplete(combinedOtp);
    }
    
    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, length).split("");
    
    if (pasteData) {
      const newOtp = [...otp];
      pasteData.forEach((value, i) => {
        if (i < length && !isNaN(Number(value))) {
          newOtp[i] = value;
          if (inputRefs.current[i]) {
            inputRefs.current[i]!.value = value;
          }
        }
      });
      
      setOtp(newOtp);
      
      // Move focus to the next empty input or the last input
      const lastFilledIndex = Math.min(pasteData.length, length - 1);
      if (inputRefs.current[lastFilledIndex]) {
        inputRefs.current[lastFilledIndex]?.focus();
      }
      
      const combinedOtp = newOtp.join("");
      if (combinedOtp.length === length) {
        onComplete(combinedOtp);
      }
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      {otp.map((_, index) => (
        <Input
          key={index}
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="w-12 h-12 text-center text-xl font-semibold"
          maxLength={1}
          disabled={isDisabled}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
