function normalizeStep(step, index, currentStepIndex) {
  if (typeof step === "string") {
    return {
      id: step.toLowerCase(),
      label: step,
      description: "",
      index,
      isCompleted: index < currentStepIndex,
      isActive: index === currentStepIndex,
      isUpcoming: index > currentStepIndex,
      status:
        index < currentStepIndex
          ? "completed"
          : index === currentStepIndex
            ? "active"
            : "upcoming",
    };
  }

  return {
    ...step,
    index: step.index ?? index,
    isCompleted: step.isCompleted ?? index < currentStepIndex,
    isActive: step.isActive ?? index === currentStepIndex,
    isUpcoming: step.isUpcoming ?? index > currentStepIndex,
    status:
      step.status ||
      (index < currentStepIndex
        ? "completed"
        : index === currentStepIndex
          ? "active"
          : "upcoming"),
  };
}

function StepIcon({ status, number }) {
  if (status === "completed") {
    return (
      <span className="step-icon completed" aria-hidden="true">
        ✓
      </span>
    );
  }

  return (
    <span className={`step-icon ${status}`} aria-hidden="true">
      {number}
    </span>
  );
}

export function CheckoutStepper({
  steps = [],
  stepProgress,
  currentStepIndex = 0,
  goToStep,
}) {
  const sourceSteps = Array.isArray(stepProgress) && stepProgress.length > 0
    ? stepProgress
    : steps;

  const normalizedSteps = sourceSteps.map((step, index) =>
    normalizeStep(step, index, currentStepIndex)
  );

  function handleStepClick(step) {
    if (typeof goToStep !== "function") {
      return;
    }

    if (step.isUpcoming) {
      return;
    }

    goToStep(step.index);
  }

  return (
    <nav
      className="checkout-stepper"
      aria-label="Checkout progress"
      aria-describedby="checkout-stepper-help"
    >
      <p id="checkout-stepper-help" className="sr-only">
        Checkout progress. Completed steps can be reviewed. Upcoming steps are
        unlocked after completing the current form.
      </p>

      <ol className="stepper-list">
        {normalizedSteps.map((step, index) => {
          const isClickable = !step.isUpcoming && typeof goToStep === "function";

          return (
            <li
              className={`stepper-item ${step.status}`}
              key={step.id || step.label}
            >
              <button
                className="stepper-button"
                type="button"
                onClick={() => handleStepClick(step)}
                disabled={!isClickable}
                aria-current={step.isActive ? "step" : undefined}
                aria-label={`${step.label}, ${step.status}`}
              >
                <StepIcon status={step.status} number={index + 1} />

                <span className="stepper-copy">
                  <span className="stepper-label">{step.label}</span>

                  {step.description && (
                    <span className="stepper-description">
                      {step.description}
                    </span>
                  )}
                </span>
              </button>

              {index < normalizedSteps.length - 1 && (
                <span className="stepper-connector" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}