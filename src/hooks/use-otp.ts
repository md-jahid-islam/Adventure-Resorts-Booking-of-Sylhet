
import { useState } from "react";

interface UseOtpOptions {
  length?: number;
  expiryTime?: number; // in seconds
}

export function useOtp({ length = 6, expiryTime = 60 }: UseOtpOptions = {}) {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(expiryTime);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

  // Generate a random OTP
  const generateOtp = () => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };

  // Send OTP to the provided phone number
  const sendOtp = async (phoneNumber: string) => {
    try {
      setIsVerifying(true);
      setOtpError(null);
      
      // Generate a new OTP
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);
      
      // In a real implementation, you would call an API to send the OTP via SMS
      // For demo purposes, we'll just log it to the console
      console.log(`OTP sent to ${phoneNumber}: ${newOtp}`);
      
      // Start the countdown timer
      setTimeLeft(expiryTime);
      setIsOtpSent(true);
      setIsVerifying(false);
      
      // Return the OTP for testing purposes (in production, you wouldn't return this)
      return newOtp;
    } catch (error) {
      setOtpError("Failed to send OTP. Please try again.");
      setIsVerifying(false);
      return null;
    }
  };

  // Verify the OTP entered by the user
  const verifyOtp = async (enteredOtp: string) => {
    try {
      setIsVerifying(true);
      setOtpError(null);
      
      // In a real implementation, you would call an API to verify the OTP
      // For demo purposes, we'll just compare it with the generated OTP
      if (enteredOtp === generatedOtp) {
        setIsVerifying(false);
        return true;
      } else {
        setOtpError("Invalid OTP. Please try again.");
        setIsVerifying(false);
        return false;
      }
    } catch (error) {
      setOtpError("Failed to verify OTP. Please try again.");
      setIsVerifying(false);
      return false;
    }
  };

  // Resend OTP
  const resendOtp = async (phoneNumber: string) => {
    setTimeLeft(expiryTime);
    return sendOtp(phoneNumber);
  };

  return {
    isOtpSent,
    isVerifying,
    otpError,
    timeLeft,
    setTimeLeft,
    sendOtp,
    verifyOtp,
    resendOtp,
    generatedOtp,
  };
}
