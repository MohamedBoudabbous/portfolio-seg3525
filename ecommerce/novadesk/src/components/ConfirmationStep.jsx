import { formatPrice } from "../utils/cartTotals";

export function ConfirmationStep({
  contactForm,
  confirmationNumber,
  maskedCardNumber,
  total,
  onBack,
  onBackToShop,
  onShareFeedback,
}) {
  const customerName = contactForm?.fullName?.trim() || "student";
  const customerEmail = contactForm?.email?.trim() || "Not provided";

  return (
    <div className="checkout-card confirmation-card">
      <p className="eyebrow">Step 4</p>

      <div className="confirmation-icon" aria-hidden="true">
        ✓
      </div>

      <h2>Order confirmed</h2>

      <p>
        Thank you for shopping with NovaDesk, {customerName}. Your prototype
        order has been confirmed.
      </p>

      <div className="confirmation-highlight" role="status">
        <span>Order number</span>
        <strong>{confirmationNumber}</strong>
      </div>

      <div className="confirmation-details">
        <div>
          <span>Delivery email</span>
          <strong>{customerEmail}</strong>
        </div>

        <div>
          <span>Payment</span>
          <strong>{maskedCardNumber}</strong>
        </div>

        <div>
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

      <div className="checkout-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={onBack}
        >
          Back
        </button>

        <button
          className="secondary-button"
          type="button"
          onClick={onBackToShop}
        >
          Back to shop
        </button>

        <button
          className="primary-button"
          type="button"
          onClick={onShareFeedback}
        >
          Share feedback
        </button>
      </div>
    </div>
  );
}