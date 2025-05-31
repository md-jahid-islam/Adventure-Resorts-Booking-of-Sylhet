import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { sendBookingConfirmations } from "@/utils/email-service";
import { BookingFormData, FormSchema } from "./booking/types";
import { PersonalInfoFields } from "./booking/PersonalInfoFields";
import { GuestCountFields } from "./booking/GuestCountFields";
import { DateFields } from "./booking/DateFields";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface BookingFormProps {
  onSubmit: (values: BookingFormData) => void;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      adults: "1",
      children: "0",
      checkInDate: new Date(),
      checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  });

  const handleFormSubmit = async (values: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const bookingReference = `BK${Date.now().toString().slice(-6)}`;
      
      // Send confirmation emails
      await sendBookingConfirmations({
        ...values,
        bookingReference,
        recipientEmail: "dandeliadventure.info@gmail.com"
      }, bookingReference);

      // Instead of showing the confirmation dialog, redirect to success page
      navigate('/booking-success');
      form.reset();
      onSubmit(values);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <PersonalInfoFields form={form} />
        <GuestCountFields form={form} />
        <DateFields form={form} />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Book Now"
          )}
        </Button>
      </form>
    </Form>
  );
}
