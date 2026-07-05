import { useMemo, useState } from "react";

const ratingOptions = [
  {
    value: "1",
    label: "1",
    description: "Very unclear",
  },
  {
    value: "2",
    label: "2",
    description: "Needs work",
  },
  {
    value: "3",
    label: "3",
    description: "Acceptable",
  },
  {
    value: "4",
    label: "4",
    description: "Clear",
  },
  {
    value: "5",
    label: "5",
    description: "Excellent",
  },
];

const initialSurvey = {
  rating: "",
  foundUseful: "",
  comment: "",
};

function getInitialSurvey() {
  return {
    ...initialSurvey,
  };
}

function getRatingLabel(value) {
  const rating = ratingOptions.find((option) => option.value === value);

  return rating ? `${rating.label}/5 — ${rating.description}` : "Not selected";
}

export function Survey({ setPage }) {
  const [survey, setSurvey] = useState(() => getInitialSurvey());
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const remainingCharacters = useMemo(() => {
    return 600 - survey.comment.length;
  }, [survey.comment.length]);

  const ratingLabel = useMemo(() => {
    return getRatingLabel(survey.rating);
  }, [survey.rating]);

  function updateField(event) {
    const { name, value } = event.target;

    setSurvey((currentSurvey) => ({
      ...currentSurvey,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  }

  function validateSurvey() {
    const nextErrors = {};

    if (!survey.rating) {
      nextErrors.rating = "Select a rating from 1 to 5.";
    }

    if (!survey.foundUseful) {
      nextErrors.foundUseful = "Tell us whether the experience was useful.";
    }

    return nextErrors;
  }

  function submitSurvey(event) {
    event.preventDefault();

    const nextErrors = validateSurvey();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function resetSurvey() {
    setSurvey(getInitialSurvey());
    setErrors({});
    setSubmitted(false);
  }

  function goToShop() {
    if (typeof setPage === "function") {
      setPage("shop");
    }
  }

  if (submitted) {
    return (
      <section
        className="survey-page"
        aria-labelledby="survey-success-title"
      >
        <div className="survey-card survey-success" role="status">
          <div className="survey-success-icon" aria-hidden="true">
            ✓
          </div>

          <p className="eyebrow">Feedback received</p>

          <h1 id="survey-success-title">Thanks for your feedback.</h1>

          <p>
            Your answer helps us improve the NovaDesk experience and make the
            prototype clearer, faster, and easier to use.
          </p>

          <div className="survey-summary" aria-label="Submitted feedback">
            <div>
              <span>Your rating</span>
              <strong>{ratingLabel}</strong>
            </div>

            <div>
              <span>Experience useful?</span>
              <strong>{survey.foundUseful === "yes" ? "Yes" : "No"}</strong>
            </div>
          </div>

          {survey.comment.trim() && (
            <div className="survey-comment-preview">
              <span>Your comment</span>
              <p>{survey.comment}</p>
            </div>
          )}

          <div className="survey-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={goToShop}
            >
              Back to shop
            </button>

            <button
              className="primary-button"
              type="button"
              onClick={resetSurvey}
            >
              Send another response
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="survey-page"
      aria-labelledby="survey-title"
      aria-describedby="survey-description"
    >
      <div className="survey-card">
        <div className="section-heading compact">
          <p className="eyebrow">Customer feedback</p>

          <h1 id="survey-title">Share your NovaDesk experience.</h1>

          <p id="survey-description">
            This short survey is part of the communication process required for
            the prototype. Your answers help evaluate clarity, confidence, and
            overall user experience.
          </p>
        </div>

        <form className="survey-form" onSubmit={submitSurvey} noValidate>
          <fieldset
            className="survey-fieldset"
            aria-describedby={errors.rating ? "rating-error" : "rating-help"}
          >
            <legend>How would you rate this shopping experience?</legend>

            <p id="rating-help" className="survey-help">
              Choose a score from 1 to 5. Higher scores mean the experience felt
              clearer and more useful.
            </p>

            <div className="rating-options">
              {ratingOptions.map((rating) => (
                <label
                  className={
                    survey.rating === rating.value
                      ? "rating-option selected"
                      : "rating-option"
                  }
                  key={rating.value}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={survey.rating === rating.value}
                    onChange={updateField}
                  />

                  <span className="rating-number">{rating.label}</span>
                  <small>{rating.description}</small>
                </label>
              ))}
            </div>

            {errors.rating && (
              <p className="form-error" id="rating-error" role="alert">
                {errors.rating}
              </p>
            )}
          </fieldset>

          <fieldset
            className="survey-fieldset"
            aria-describedby={
              errors.foundUseful ? "foundUseful-error" : "foundUseful-help"
            }
          >
            <legend>Was the prototype useful and easy to understand?</legend>

            <p id="foundUseful-help" className="survey-help">
              This helps us understand whether the product search, cart, and
              checkout flow communicate clearly.
            </p>

            <div className="survey-option-group">
              <label
                className={
                  survey.foundUseful === "yes"
                    ? "radio-card selected"
                    : "radio-card"
                }
              >
                <input
                  type="radio"
                  name="foundUseful"
                  value="yes"
                  checked={survey.foundUseful === "yes"}
                  onChange={updateField}
                />

                <span>
                  <strong>Yes</strong>
                  <small>The shopping flow felt clear and helpful.</small>
                </span>
              </label>

              <label
                className={
                  survey.foundUseful === "no"
                    ? "radio-card selected"
                    : "radio-card"
                }
              >
                <input
                  type="radio"
                  name="foundUseful"
                  value="no"
                  checked={survey.foundUseful === "no"}
                  onChange={updateField}
                />

                <span>
                  <strong>No</strong>
                  <small>Some parts should be improved or clarified.</small>
                </span>
              </label>
            </div>

            {errors.foundUseful && (
              <p className="form-error" id="foundUseful-error" role="alert">
                {errors.foundUseful}
              </p>
            )}
          </fieldset>

          <label className="form-field full-width">
            <span>Additional comment</span>

            <textarea
              name="comment"
              value={survey.comment}
              onChange={updateField}
              rows="5"
              maxLength="600"
              placeholder="Tell us what worked well or what should be improved."
              aria-describedby="comment-help"
            />

            <small id="comment-help" className="character-count">
              {remainingCharacters} characters remaining
            </small>
          </label>

          <div className="survey-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={goToShop}
            >
              Back to shop
            </button>

            <button className="primary-button" type="submit">
              Send feedback
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}