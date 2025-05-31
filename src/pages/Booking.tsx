import React, { useState } from 'react';
import { BookingForm } from '@/components/BookingForm';
import { PaymentForm } from '@/components/PaymentForm';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendEmail, formatBookingEmail, sendSMS, formatBookingSMS } from '@/utils/email-service';

const BookingPage = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStep, setBookingStep] = useState<'form' | 'payment' | 'confirmation'>('form');
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const handleBookingSubmit = async (values: any) => {
    setIsSubmitting(true);
    setCurrentBooking(values);
    try {
      setBookingStep('payment');
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (paymentTransactionId: string) => {
    setTransactionId(paymentTransactionId);
    try {
      const emailContent = formatBookingEmail({
        ...currentBooking,
        paymentTransactionId
      });
      await sendEmail({
        to: "stanleyyesu@gmail.com",
        subject: `New Booking: ${currentBooking.name}`,
        body: emailContent
      });

      await sendEmail({
        to: currentBooking.email,
        subject: "Your Booking Confirmation - Dandeli Adventures",
        body: emailContent
      });

      if (currentBooking.phone) {
        const smsContent = formatBookingSMS({
          ...currentBooking,
          paymentTransactionId
        });
        await sendSMS({
          to: currentBooking.phone,
          message: smsContent
        });
      }
      setBookingStep('confirmation');
      toast({
        title: "Booking Confirmed!",
        description: "Check your email and phone for booking details.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      toast({
        title: "Booking Successful",
        description: "However, there was an issue sending the confirmation email.",
        variant: "default"
      });
      setBookingStep('confirmation');
    }
  };

  const handlePaymentCancel = () => {
    setBookingStep('form');
  };

  const resetBooking = () => {
    setBookingStep('form');
    setCurrentBooking(null);
    setTransactionId(null);
  };

  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('/lovable-uploads/7fb9e3c6-353a-410e-8478-5741bfe3ab03.png')",
          backgroundPosition: "center 30%"
        }}>
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="container relative h-full flex flex-col justify-center items-center text-center text-white z-10 px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">Book Your Gateway</h1>
            <p className="text-lg md:text-xl max-w-2xl animate-slide-up animation-delay-200">
              Reserve your perfect stay in the heart of nature's paradise
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 animate-fade-in">
              {bookingStep === 'form' && <>
                  <h2 className="text-2xl font-display font-semibold mb-6">Reservation Details</h2>
                  <BookingForm onSubmit={handleBookingSubmit} />
                </>}
              
              {bookingStep === 'payment' && currentBooking && <>
                  <h2 className="text-2xl font-display font-semibold mb-6">Payment Details</h2>
                  <PaymentForm bookingDetails={currentBooking} onPaymentSuccess={handlePaymentSuccess} onCancel={handlePaymentCancel} />
                </>}
              
              {bookingStep === 'confirmation' && <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold mb-4">Booking Confirmed!</h2>
                  <p className="mb-4 text-muted-foreground">
                    Thank you for booking with Dandeli Adventures. We've sent a confirmation email to {currentBooking?.email} and an SMS to your phone.
                  </p>
                  {transactionId && <p className="text-sm bg-muted p-3 rounded-md inline-block mb-6">
                      Transaction ID: {transactionId}
                    </p>}
                  <button onClick={resetBooking} className="btn-primary mx-auto mt-4">
                    Make Another Booking
                  </button>
                </div>}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in animation-delay-200">
                <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                  <Info size={20} className="text-accent" />
                  Booking Information
                </h3>
                <Separator className="mb-4" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span>Check-in time: 12:00 PM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span>Check-out time: 11:00 AM (Max 24hrs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span>Free cancellation up to 48 hours before check-in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span>Pet-friendly accommodations available (additional charges may apply)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in animation-delay-400">
                <h3 className="text-xl font-display font-semibold mb-4">Need Assistance?</h3>
                <Separator className="mb-4" />
                <p className="mb-4 text-sm">Our reservation team is available to help you plan your perfect stay.</p>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Call us:</p>
                  <p className="text-accent">+91 8904704234
+91 7795601255</p>
                  <p className="font-medium mt-3">Email:</p>
                  <p className="text-accent">dandeliadventuresinfo@gmail.com</p>
                </div>
              </div>
              
              <div className="bg-accent/10 rounded-lg p-6 animate-fade-in animation-delay-600">
                <p className="italic text-sm mb-4">
                  "Our stay at Dandeli Adventures was absolutely magical. The staff went above and beyond to make our vacation unforgettable!"
                </p>
                <p className="font-medium text-sm">- Priya & Rahul , Banglore</p>
              </div>
            </div>
          </div>
        </div>
        
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-semibold mb-8 text-center">Booking Policies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-display font-semibold mb-4">Reservation Policy</h3>
                <ul className="space-y-2 text-sm">
                  <li>• A 50% advance payment is required to confirm your booking</li>
                  <li>• Full payment is due upon check-in</li>
                  <li>• We accept all major credit cards, UPI, and bank transfers</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-display font-semibold mb-4">Cancellation Policy</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Free cancellation up to 48 hours before check-in</li>
                  <li>• 50% refund for cancellations made 24-48 hours before check-in</li>
                  <li>• No refund for cancellations made less than 24 hours before check-in</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-display font-semibold mb-4">Additional Information</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Extra person charges may apply beyond double occupancy</li>
                  <li>• Special requests are subject to availability</li>
                  <li>• Government-issued ID is required at check-in</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>)}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

const faqs = [{
  question: "How do I make a reservation?",
  answer: "You can make a reservation by filling out the booking form on our website, calling our reservation team, or sending an email to bookings@dandeliadventures.com."
}, {
  question: "Is there a minimum stay requirement?",
  answer: "During weekends and peak seasons, there is typically a 2-night minimum stay requirement. During weekdays and off-peak seasons, single-night stays may be available."
}, {
  question: "Do you offer airport transfers?",
  answer: "Yes, we offer airport transfers from Hubballi Airport and Goa Airport for an additional fee. Please mention your requirement in the special requests section of the booking form."
}, {
  question: "Are meals included in the room rate?",
  answer: "Our standard packages include breakfast. You can upgrade to half-board (breakfast and dinner) or full-board (all meals) options during the booking process."
}, {
  question: "Can I book activities in advance?",
  answer: "Yes, we recommend booking activities in advance, especially during peak season. You can add activities to your reservation through our booking form or contact our team for assistance."
}];

export default BookingPage;
