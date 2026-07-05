function getText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeCardNumber(value) {
  return getText(value).replace(/[\s-]+/g, "");
}

function normalizeExpiryDate(value) {
  return getText(value).replace(/\s+/g, "");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getText(email));
}

function isValidPostalCode(postalCode) {
  const value = getText(postalCode).toUpperCase();

  if (value.length === 0) {
    return false;
  }

  return /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/.test(value);
}

function parseExpiryDate(expiry) {
  const value = normalizeExpiryDate(expiry);

  const shortFormat = /^(0[1-9]|1[0-2])\/(\d{2})$/;
  const longFormat = /^(0[1-9]|1[0-2])\/(\d{4})$/;

  let match = value.match(shortFormat);

  if (match) {
    return {
      month: Number(match[1]),
      year: 2000 + Number(match[2]),
    };
  }

  match = value.match(longFormat);

  if (match) {
    return {
      month: Number(match[1]),
      year: Number(match[2]),
    };
  }

  return null;
}

function isValidExpiryDate(expiry) {
  const parsedExpiry = parseExpiryDate(expiry);

  if (!parsedExpiry) {
    return false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (parsedExpiry.year < currentYear) {
    return false;
  }

  if (
    parsedExpiry.year === currentYear &&
    parsedExpiry.month < currentMonth
  ) {
    return false;
  }

  return true;
}

export function validateContactForm(form) {
  const errors = {};

  const fullName = getText(form.fullName);
  const email = getText(form.email);
  const address = getText(form.address);
  const city = getText(form.city);
  const postalCode = getText(form.postalCode);

  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (address.length < 5) {
    errors.address = "Enter a complete delivery address.";
  }

  if (city.length < 2) {
    errors.city = "Enter your city.";
  }

  if (!isValidPostalCode(postalCode)) {
    errors.postalCode = "Enter a valid Canadian postal code, such as K1N 6N5.";
  }

  return errors;
}

export function validatePaymentForm(form) {
  const errors = {};

  const cardName = getText(form.cardName);
  const cardNumber = normalizeCardNumber(form.cardNumber);
  const expiry = getText(form.expiry);
  const cvv = getText(form.cvv);

  if (cardName.length < 2) {
    errors.cardName = "Enter the name shown on the card.";
  }

  if (!/^\d{12,19}$/.test(cardNumber)) {
    errors.cardNumber = "Enter a valid card number using 12 to 19 digits.";
  }

  if (!isValidExpiryDate(expiry)) {
    errors.expiry =
      "Enter a valid future expiry date, such as 11/30 or 11/2030.";
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    errors.cvv = "Enter the 3 or 4 digit security code.";
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}