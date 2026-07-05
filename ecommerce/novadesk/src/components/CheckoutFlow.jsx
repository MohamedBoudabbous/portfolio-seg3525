import { useMemo, useState } from "react";
import { useCheckout } from "../hooks/useCheckout";
import { validateContactForm, validatePaymentForm } from "../utils/validation";
import { formatPrice, getCartSummary } from "../utils/cartTotals";
import { CheckoutStepper } from "./CheckoutStepper";
import { ContactStep } from "./ContactStep";
import { PaymentStep } from "./PaymentStep";
import { ConfirmationStep } from "./ConfirmationStep";

const initialContactForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
};

const initialPaymentForm = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

function getSafeCart(cart) {
  return Array.isArray(cart) ? cart : [];
}

function getSafeSummary(cart, cartSummary) {
  if (
    cartSummary &&
    typeof cartSummary.subtotal === "number" &&
    typeof cartSummary.taxes === "number" &&
    typeof cartSummary.total === "number"
  ) {
    return cartSummary;
  }

  return getCartSummary(cart);
}

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

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

function OrderSummary({ cart, summary }) {
  return (
    <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
      <div>
        <p className="eyebrow">Order summary</p>
        <h2 id="checkout-summary-title">Your order</h2>
      </div>

      <div className="checkout-summary-items">
        {cart.map((item) => (
          <div className="checkout-summary-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>
                {item.quantity} × {formatPrice(item.price)}
              </span>
            </div>

            <strong>{formatPrice(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>

      <dl className="summary-list">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(summary.subtotal)}</dd>
        </div>

        <div>
          <dt>Estimated taxes</dt>
          <dd>{formatPrice(summary.taxes)}</dd>
        </div>

        <div className="summary-total">
          <dt>Total</dt>
          <dd>{formatPrice(summary.total)}</dd>
        </div>
      </dl>

      <p className="cart-disclaimer">
        Prototype checkout only. No real payment will be processed.
      </p>
    </aside>
  );
}

export function CheckoutFlow({
  cart = [],
  cartSummary,
  setPage,
  onBackToCart,
  onFinish,
}) {
  const checkout = useCheckout(0);
  const safeCart = getSafeCart(cart);
  const summary = getSafeSummary(safeCart, cartSummary);

  const [contactForm, setContactForm] = useState(initialContactForm);
  const [paymentForm, setPaymentForm] = useState(initialPaymentForm);
  const [contactErrors, setContactErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const [confirmationNumber] = useState(() => {
    return `ND-${Math.floor(100000 + Math.random() * 900000)}`;
  });

  const isCartEmpty = safeCart.length === 0;

  const maskedCardNumber = useMemo(() => {
    const digits = paymentForm.cardNumber.replace(/\s+/g, "");

    if (digits.length < 4) {
      return "Card ending not available";
    }

    return `Card ending in ${digits.slice(-4)}`;
  }, [paymentForm.cardNumber]);

  function updateContactField(event) {
    const { name, value } = event.target;

    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (contactErrors[name]) {
      setContactErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  }

  function updatePaymentField(event) {
    const { name, value } = event.target;

    setPaymentForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (paymentErrors[name]) {
      setPaymentErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  }

  function goToShop() {
    if (typeof setPage === "function") {
      setPage("shop");
    }
  }

  function handleBackToCart() {
    if (typeof onBackToCart === "function") {
      onBackToCart();
      return;
    }

    if (typeof setPage === "function") {
      setPage("cart");
    }
  }

  function continueFromCart() {
    if (isCartEmpty) {
      return;
    }

    checkout.goNext();
  }

  function submitContact(event) {
    event.preventDefault();

    const errors = validateContactForm(contactForm);
    setContactErrors(errors);

    if (!hasErrors(errors)) {
      checkout.goNext();
    }
  }

  function submitPayment(event) {
    event.preventDefault();

    const errors = validatePaymentForm(paymentForm);
    setPaymentErrors(errors);

    if (!hasErrors(errors)) {
      checkout.goNext();
    }
  }

  function finishOrder() {
    if (typeof onFinish === "function") {
      onFinish();
    }
  }

  return (
    <section
      className="checkout-flow"
      aria-labelledby="checkout-title"
      aria-describedby="checkout-description"
    >
      <div className="checkout-header">
        <div>
          <p className="eyebrow">Guided checkout</p>

          <h1 id="checkout-title">Checkout</h1>

          <p id="checkout-description">
            Complete the order through clear steps: review your cart, enter
            delivery details, add simulated payment information, and confirm.
          </p>
        </div>

        <button
          className="secondary-button"
          type="button"
          onClick={handleBackToCart}
        >
          Back to cart
        </button>
      </div>

      <CheckoutStepper
        steps={checkout.steps}
        stepProgress={checkout.stepProgress}
        currentStepIndex={checkout.currentStepIndex}
        goToStep={checkout.goToStep}
      />

      {checkout.currentStepId === "cart" && (
        <div className="checkout-layout">
          <div className="checkout-card">
            <p className="eyebrow">Step 1</p>
            <h2>Review your cart</h2>

            {isCartEmpty ? (
              <div className="checkout-empty">
                <h3>Your cart is empty.</h3>
                <p>
                  Add at least one product before starting the checkout flow.
                </p>

                <button
                  className="primary-button"
                  type="button"
                  onClick={goToShop}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="checkout-cart-list">
                  {safeCart.map((item) => (
                    <article className="checkout-cart-item" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        loading="lazy"
                      />

                      <div>
                        <p>{item.category}</p>
                        <h3>{item.name}</h3>
                        <span>
                          {item.quantity} × {formatPrice(item.price)}
                        </span>
                      </div>

                      <strong>
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </article>
                  ))}
                </div>

                <div className="checkout-actions">
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={handleBackToCart}
                  >
                    Edit cart
                  </button>

                  <button
                    className="primary-button"
                    type="button"
                    onClick={continueFromCart}
                  >
                    Continue to contact
                  </button>
                </div>
              </>
            )}
          </div>

          {!isCartEmpty && <OrderSummary cart={safeCart} summary={summary} />}
        </div>
      )}
      {checkout.currentStepId === "contact" && (
        <div className="checkout-layout">
          <ContactStep
            contactForm={contactForm}
            contactErrors={contactErrors}
            onChange={updateContactField}
            onSubmit={submitContact}
            onBack={checkout.goBack}
          />

          <OrderSummary cart={safeCart} summary={summary} />
        </div>
      )}

      {checkout.currentStepId === "payment" && (
        <div className="checkout-layout">
          <PaymentStep
            paymentForm={paymentForm}
            paymentErrors={paymentErrors}
            onChange={updatePaymentField}
            onSubmit={submitPayment}
            onBack={checkout.goBack}
          />

          <OrderSummary cart={safeCart} summary={summary} />
        </div>
      )}

      {checkout.currentStepId === "confirmation" && (
        <div className="checkout-layout">
          <ConfirmationStep
            contactForm={contactForm}
            confirmationNumber={confirmationNumber}
            maskedCardNumber={maskedCardNumber}
            total={summary.total}
            onBack={checkout.goBack}
            onBackToShop={goToShop}
            onShareFeedback={finishOrder}
          />

          <OrderSummary cart={safeCart} summary={summary} />
        </div>
      )}
    </section>
  );
}