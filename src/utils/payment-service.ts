
/**
 * Payment Service Utility
 * Handles payment processing functionality
 */

interface PaymentDetails {
  amount: number;
  currency: string;
  paymentMethod: string;
  description: string;
  metadata?: Record<string, any>;
  cardDetails?: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  };
  upiId?: string;
}

// Mock API endpoints that would be real in production
const API_ENDPOINTS = {
  PROCESS_PAYMENT: 'https://api.razorpay.com/v1/payment_links', // Changed to Razorpay API
  VERIFY_PAYMENT: 'https://api.razorpay.com/v1/payments/verify',
};

/**
 * Process a payment through payment gateway
 * @param details Payment details including amount, currency, and method
 * @returns Promise that resolves with payment result
 */
export const processPayment = async (details: PaymentDetails): Promise<{success: boolean; transactionId?: string; error?: string}> => {
  try {
    console.log('Processing payment:', details);
    
    // In production, this would be a real API call to a payment processor
    // For demo, we're simulating the API call
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validate card details if using credit card
    if (details.paymentMethod === 'creditCard' && details.cardDetails) {
      // Basic validation for demonstration
      const { cardNumber, expiryDate, cvv } = details.cardDetails;
      
      if (!cardNumber || !expiryDate || !cvv) {
        throw new Error('Invalid card details');
      }
      
      // Additional validations could be added here
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Invalid card number');
      }
      
      if (cvv.length !== 3) {
        throw new Error('Invalid CVV');
      }
    }
    
    // Validate UPI ID if using UPI
    if (details.paymentMethod === 'upi' && details.upiId) {
      if (!details.upiId.includes('@')) {
        throw new Error('Invalid UPI ID');
      }
    }
    
    // Generate a transaction ID (in production, this would come from the payment gateway)
    const transactionId = 'DANDELI' + Date.now().toString(36).toUpperCase();
    
    // In a real implementation, we would integrate with Razorpay or another payment gateway
    // Example code for Razorpay integration (commented out as this would need proper credentials)
    /*
    const response = await fetch(API_ENDPOINTS.PROCESS_PAYMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
      },
      body: JSON.stringify({
        amount: details.amount * 100, // In paise
        currency: 'INR',
        description: details.description,
        customer: {
          name: details.metadata?.guestName,
          email: details.metadata?.email,
          contact: details.metadata?.phone
        },
        notify: {
          sms: true,
          email: true
        },
        reminder_enable: true,
        notes: {
          roomType: details.metadata?.roomType,
          checkInDate: details.metadata?.checkInDate
        }
      })
    });
    
    const result = await response.json();
    return {
      success: true,
      transactionId: result.id
    };
    */
    
    return {
      success: true,
      transactionId
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment processing failed. Please try again.'
    };
  }
};

/**
 * Calculate booking price based on room type and guests
 * @param roomType The type of room booked
 * @param adults Number of adults
 * @param children Number of children
 * @returns Calculated price
 */
export const calculateBookingPrice = (roomType: string, adults: number, children: number): number => {
  // Base prices per room type (in INR)
  const basePrices = {
    standard: 2499,
    deluxe: 3999,
    suite: 5999
  };
  
  // Get the base price for the room type
  const basePrice = roomType in basePrices 
    ? basePrices[roomType as keyof typeof basePrices] 
    : 2499;
  
  // Add per person costs
  const adultCost = adults * 500;  // ₹500 per additional adult
  const childrenCost = children * 300;  // ₹300 per child
  
  // Apply season discounts if applicable (could be expanded in a real system)
  const calculatedPrice = basePrice + adultCost + childrenCost;
  
  return calculatedPrice;
};

/**
 * Apply promotional discount to booking
 * @param amount The original amount
 * @param promoCode Promotional code
 * @returns Discounted amount
 */
export const applyPromoCode = (amount: number, promoCode: string): { discountedAmount: number; discount: number; valid: boolean } => {
  // Valid promo codes and their discount percentages
  const validPromoCodes: Record<string, number> = {
    'SUMMER25': 25,
    'WELCOME15': 15,
    'MONSOON20': 20,
    'EARLYBIRD10': 10
  };
  
  if (promoCode && promoCode in validPromoCodes) {
    const discountPercentage = validPromoCodes[promoCode];
    const discount = (amount * discountPercentage) / 100;
    return {
      discountedAmount: amount - discount,
      discount,
      valid: true
    };
  }
  
  return {
    discountedAmount: amount,
    discount: 0,
    valid: false
  };
};
