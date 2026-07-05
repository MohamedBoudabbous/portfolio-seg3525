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

export function ContactStep({
  contactForm,
  contactErrors = {},
  onChange,
  onSubmit,
  onBack,
}) {
  return (
    <form className="checkout-card" onSubmit={onSubmit} noValidate>
      <p className="eyebrow">Step 2</p>

      <h2>Delivery contact</h2>

      <p className="form-help">
        Enter the delivery information for this simulated NovaDesk order.
      </p>

      <div className="form-grid">
        <label className="form-field">
          <span>Full name</span>

          <input
            type="text"
            name="fullName"
            value={contactForm.fullName}
            onChange={onChange}
            autoComplete="name"
            aria-invalid={Boolean(contactErrors.fullName)}
            aria-describedby={
              contactErrors.fullName ? "fullName-error" : undefined
            }
          />

          <FormError
            id="fullName-error"
            message={getFieldError(contactErrors, "fullName")}
          />
        </label>

        <label className="form-field">
          <span>Email</span>

          <input
            type="email"
            name="email"
            value={contactForm.email}
            onChange={onChange}
            autoComplete="email"
            aria-invalid={Boolean(contactErrors.email)}
            aria-describedby={contactErrors.email ? "email-error" : undefined}
          />

          <FormError
            id="email-error"
            message={getFieldError(contactErrors, "email")}
          />
        </label>

        <label className="form-field full-width">
          <span>Delivery address</span>

          <input
            type="text"
            name="address"
            value={contactForm.address}
            onChange={onChange}
            autoComplete="street-address"
            aria-invalid={Boolean(contactErrors.address)}
            aria-describedby={
              contactErrors.address ? "address-error" : undefined
            }
          />

          <FormError
            id="address-error"
            message={getFieldError(contactErrors, "address")}
          />
        </label>

        <label className="form-field">
          <span>City</span>

          <input
            type="text"
            name="city"
            value={contactForm.city}
            onChange={onChange}
            autoComplete="address-level2"
            aria-invalid={Boolean(contactErrors.city)}
            aria-describedby={contactErrors.city ? "city-error" : undefined}
          />

          <FormError
            id="city-error"
            message={getFieldError(contactErrors, "city")}
          />
        </label>

        <label className="form-field">
          <span>Postal code</span>

          <input
            type="text"
            name="postalCode"
            value={contactForm.postalCode}
            onChange={onChange}
            autoComplete="postal-code"
            placeholder="K1N 6N5"
            aria-invalid={Boolean(contactErrors.postalCode)}
            aria-describedby={
              contactErrors.postalCode ? "postalCode-error" : undefined
            }
          />

          <FormError
            id="postalCode-error"
            message={getFieldError(contactErrors, "postalCode")}
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
          Continue to payment
        </button>
      </div>
    </form>
  );
}