function getFieldError(errors, fieldName) {
  return errors?.[fieldName] || "";
}

function FormError({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <p className="form-error" id={id}>
      {message}
    </p>
  );
}

export function PaymentStep({
  paymentForm,
  paymentErrors = {},
  onChange,
  onSubmit,
  onBack,
}) {
  return (
    <form className="checkout-card" onSubmit={onSubmit} noValidate>
      <p className="eyebrow">Step 3</p>

      <h2>Payment details</h2>

      <div className="prototype-warning" role="note">
        <strong>Prototype only</strong>
        <span>No real payment will be processed.</span>
      </div>

      <p className="form-help">
        Use simulated payment information to complete the checkout flow. This
        form is for interface testing only.
      </p>

      <div className="form-grid">
        <label className="form-field full-width">
          <span>Name on card</span>

          <input
            type="text"
            name="cardName"
            value={paymentForm.cardName}
            onChange={onChange}
            autoComplete="cc-name"
            aria-invalid={Boolean(paymentErrors.cardName)}
            aria-describedby={
              paymentErrors.cardName ? "cardName-error" : undefined
            }
          />

          <FormError
            id="cardName-error"
            message={getFieldError(paymentErrors, "cardName")}
          />
        </label>

        <label className="form-field full-width">
          <span>Card number</span>

          <input
            type="text"
            name="cardNumber"
            value={paymentForm.cardNumber}
            onChange={onChange}
            autoComplete="cc-number"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            aria-invalid={Boolean(paymentErrors.cardNumber)}
            aria-describedby={
              paymentErrors.cardNumber ? "cardNumber-error" : undefined
            }
          />

          <FormError
            id="cardNumber-error"
            message={getFieldError(paymentErrors, "cardNumber")}
          />
        </label>

        <label className="form-field">
          <span>Expiry</span>

          <input
            type="text"
            name="expiry"
            value={paymentForm.expiry}
            onChange={onChange}
            autoComplete="cc-exp"
            inputMode="numeric"
            placeholder="12/28 Or 12/2028"
            aria-invalid={Boolean(paymentErrors.expiry)}
            aria-describedby={paymentErrors.expiry ? "expiry-error" : undefined}
          />

          <FormError
            id="expiry-error"
            message={getFieldError(paymentErrors, "expiry")}
          />
        </label>

        <label className="form-field">
          <span>CVV</span>

          <input
            type="text"
            name="cvv"
            value={paymentForm.cvv}
            onChange={onChange}
            autoComplete="cc-csc"
            inputMode="numeric"
            placeholder="123"
            aria-invalid={Boolean(paymentErrors.cvv)}
            aria-describedby={paymentErrors.cvv ? "cvv-error" : undefined}
          />

          <FormError
            id="cvv-error"
            message={getFieldError(paymentErrors, "cvv")}
          />
        </label>
      </div>

      <div className="checkout-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={onBack}
        >
          Back
        </button>

        <button className="primary-button" type="submit">
          Review confirmation
        </button>
      </div>
    </form>
  );
}