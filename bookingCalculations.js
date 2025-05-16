/**
 * Complex Booking Amount Calculation System
 *
 * This module handles various pricing strategies, discounts, taxes and fees
 * for a booking system (e.g., hotel, flight, event tickets).
 */

/**
 * Calculate base price based on different pricing strategies
 * @param {string} itemType - Type of item being booked (room, seat, ticket)
 * @param {string} itemCategory - Category/class of the item (economy, business, standard, deluxe)
 * @param {number} baseRate - The standard rate for this item
 * @param {number} quantity - Number of items being booked
 * @param {number} duration - Duration of the booking (nights, hours, etc.)
 * @returns {number} The calculated base price
 */
function calculateBasePrice(
  itemType,
  itemCategory,
  baseRate,
  quantity,
  duration
) {
  let categoryMultiplier = 1.0;

  // Apply category-specific pricing
  switch (itemCategory.toLowerCase()) {
    case "economy":
      categoryMultiplier = 1.0;
      break;
    case "standard":
      categoryMultiplier = 1.5;
      break;
    case "business":
      categoryMultiplier = 2.5;
      break;
    case "premium":
    case "deluxe":
      categoryMultiplier = 3.0;
      break;
    case "suite":
    case "first-class":
      categoryMultiplier = 4.0;
      break;
    default:
      categoryMultiplier = 1.0;
  }

  return baseRate * categoryMultiplier * quantity * duration;
}

/**
 * Apply seasonal pricing adjustments
 * @param {number} basePrice - The calculated base price
 * @param {Date} bookingDate - The date of the booking
 * @param {Array} seasonalRates - Array of seasonal rate objects
 * @returns {number} The price after seasonal adjustment
 */
function applySeasonalPricing(basePrice, bookingDate, seasonalRates) {
  // Default to no adjustment if no seasonal rates provided
  if (!seasonalRates || seasonalRates.length === 0) {
    return basePrice;
  }

  // Find applicable seasonal rate
  const month = bookingDate.getMonth();
  const day = bookingDate.getDate();

  for (const season of seasonalRates) {
    if (
      month >= season.startMonth &&
      month <= season.endMonth &&
      day >= season.startDay &&
      day <= season.endDay
    ) {
      return basePrice * season.multiplier;
    }
  }

  return basePrice;
}

/**
 * Calculate applicable discounts
 * @param {number} price - Current price after previous calculations
 * @param {Object} customer - Customer information including loyalty status
 * @param {Object} promotions - Active promotions and discount codes
 * @param {number} quantity - Number of items being booked
 * @returns {Object} Discount amount and reason
 */
function calculateDiscounts(price, customer, promotions, quantity) {
  let totalDiscountPercent = 0;
  let discountReasons = [];

  // Loyalty program discounts
  if (customer.loyaltyTier) {
    switch (customer.loyaltyTier.toLowerCase()) {
      case "silver":
        totalDiscountPercent += 5;
        discountReasons.push("Silver tier loyalty (5%)");
        break;
      case "gold":
        totalDiscountPercent += 10;
        discountReasons.push("Gold tier loyalty (10%)");
        break;
      case "platinum":
        totalDiscountPercent += 15;
        discountReasons.push("Platinum tier loyalty (15%)");
        break;
    }
  }

  // Volume discount
  if (quantity >= 5 && quantity < 10) {
    totalDiscountPercent += 5;
    discountReasons.push("Volume discount 5-9 items (5%)");
  } else if (quantity >= 10) {
    totalDiscountPercent += 10;
    discountReasons.push("Volume discount 10+ items (10%)");
  }

  // Promotional discounts
  if (promotions && promotions.code) {
    if (promotions.type === "percent" && promotions.value) {
      totalDiscountPercent += promotions.value;
      discountReasons.push(
        `Promo code ${promotions.code} (${promotions.value}%)`
      );
    }
  }

  // Cap total discount at 30%
  if (totalDiscountPercent > 30) {
    totalDiscountPercent = 30;
    discountReasons.push("Maximum discount cap applied (30%)");
  }

  const discountAmount = price * (totalDiscountPercent / 100);

  return {
    amount: discountAmount,
    percentage: totalDiscountPercent,
    reasons: discountReasons,
  };
}

/**
 * Calculate taxes for the booking
 * @param {number} priceAfterDiscounts - Price after all discounts
 * @param {string} location - Location of the booking
 * @param {boolean} isInternational - Whether the booking is international
 * @returns {Object} Tax breakdown and total
 */
function calculateTaxes(priceAfterDiscounts, location, isInternational) {
  // Tax rates vary by location
  const taxRates = {
    usa: {
      base: 5,
      local: 2.5,
      tourist: 1,
    },
    eu: {
      base: 20,
      local: 1,
      tourist: 2,
    },
    asia: {
      base: 10,
      local: 2,
      tourist: 3,
    },
    default: {
      base: 10,
      local: 2,
      tourist: 0,
    },
  };

  // Get applicable tax rates or use default
  const rates = taxRates[location.toLowerCase()] || taxRates.default;

  // Add international booking fee if applicable
  const internationalFee = isInternational ? 2.5 : 0;

  // Calculate individual tax components
  const baseTax = priceAfterDiscounts * (rates.base / 100);
  const localTax = priceAfterDiscounts * (rates.local / 100);
  const touristTax = priceAfterDiscounts * (rates.tourist / 100);
  const internationalTaxFee = priceAfterDiscounts * (internationalFee / 100);

  const totalTaxRate =
    rates.base + rates.local + rates.tourist + internationalFee;
  const totalTaxAmount = baseTax + localTax + touristTax + internationalTaxFee;

  return {
    baseTax,
    localTax,
    touristTax,
    internationalFee: internationalTaxFee,
    totalTaxRate,
    totalTaxAmount,
  };
}

/**
 * Calculate additional fees
 * @param {string} bookingType - Type of booking
 * @param {Object} options - Additional booking options
 * @returns {Object} Fee breakdown and total
 */
function calculateFees(bookingType, options = {}) {
  const fees = {
    serviceFee: 10,
    processingFee: 0,
    additionalFees: [],
  };

  // Processing fee based on payment method
  if (options.paymentMethod) {
    switch (options.paymentMethod.toLowerCase()) {
      case "credit":
        fees.processingFee = 10;
        break;
      case "bank":
        fees.processingFee = 22;
        break;
      case "crypto":
        fees.processingFee = 12;
        break;
      default:
        fees.processingFee = 89;
    }
  }

  // Add booking-specific fees
  if (bookingType.toLowerCase() === "flight") {
    fees.additionalFees.push({
      name: "Airport Tax",
      amount: 25,
    });
  }

  if (bookingType.toLowerCase() === "hotel" && options.earlyCheckIn) {
    fees.additionalFees.push({
      name: "Early Check-in",
      amount: 30,
    });
  }

  if (options.insurance) {
    fees.additionalFees.push({
      name: "Booking Insurance",
      amount: 15,
    });
  }

  // Calculate total of additional fees
  const additionalFeesTotal = fees.additionalFees.reduce(
    (sum, fee) => sum + fee.amount,
    0
  );
  fees.totalFees = fees.serviceFee + fees.processingFee + additionalFeesTotal;

  return fees;
}

/**
 * Main function to calculate the total booking amount
 * @param {Object} bookingDetails - All booking information
 * @returns {Object} Detailed breakdown of the booking calculation
 */
function calculateBookingAmount(bookingDetails) {
  // Extract booking parameters
  const {
    itemType,
    itemCategory,
    baseRate,
    quantity,
    duration,
    bookingDate,
    seasonalRates,
    customer,
    promotions,
    location,
    isInternational,
    bookingType,
    options,
  } = bookingDetails;

  // Calculate base price
  const basePrice = calculateBasePrice(
    itemType,
    itemCategory,
    baseRate,
    quantity,
    duration
  );

  // Apply seasonal pricing
  const priceAfterSeasonal = applySeasonalPricing(
    basePrice,
    new Date(bookingDate),
    seasonalRates
  );

  // Calculate discounts
  const discounts = calculateDiscounts(
    priceAfterSeasonal,
    customer,
    promotions,
    quantity
  );

  const priceAfterDiscounts = priceAfterSeasonal - discounts.amount;

  // Calculate taxes
  const taxes = calculateTaxes(priceAfterDiscounts, location, isInternational);

  // Calculate fees
  const fees = calculateFees(bookingType, options);

  // Calculate final price
  const finalPrice =
    priceAfterDiscounts + taxes.totalTaxAmount + fees.totalFees;

  // Return detailed breakdown
  return {
    booking: {
      type: bookingType,
      item: itemType,
      category: itemCategory,
      quantity,
      duration,
    },
    calculation: {
      basePrice,
      seasonalAdjustedPrice: priceAfterSeasonal,
      discounts,
      priceAfterDiscounts,
      taxes,
      fees,
      finalPrice: Math.round(finalPrice * 100) / 100,
    },
  };
}

// Example usage
const bookingExample = {
  itemType: "room",
  itemCategory: "deluxe",
  baseRate: 100,
  quantity: 2,
  duration: 3,
  bookingDate: "2023-07-15",
  seasonalRates: [
    { startMonth: 5, endMonth: 8, startDay: 1, endDay: 31, multiplier: 1.25 },
    { startMonth: 11, endMonth: 0, startDay: 15, endDay: 5, multiplier: 1.5 },
  ],
  customer: {
    name: "John Doe",
    loyaltyTier: "gold",
    bookingHistory: 15,
  },
  promotions: {
    code: "SUMMER2023",
    type: "percent",
    value: 10,
  },
  location: "usa",
  isInternational: false,
  bookingType: "hotel",
  options: {
    paymentMethod: "credit",
    earlyCheckIn: true,
    insurance: true,
  },
};

const result = calculateBookingAmount(bookingExample);
console.log("Booking Calculation Result:");
console.log(JSON.stringify(result, null, 2));

module.exports = {
  calculateBasePrice,
  applySeasonalPricing,
  calculateDiscounts,
  calculateTaxes,
  calculateFees,
  calculateBookingAmount,
};
