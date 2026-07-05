import { useCallback, useMemo, useState } from "react";

export const checkoutSteps = [
  {
    id: "cart",
    label: "Cart",
    description: "Review your selected products."
  },
  {
    id: "contact",
    label: "Contact",
    description: "Enter delivery information."
  },
  {
    id: "payment",
    label: "Payment",
    description: "Add simulated payment details."
  },
  {
    id: "confirmation",
    label: "Confirmation",
    description: "Receive order confirmation."
  }
];

function clampStepIndex(index) {
  if (typeof index !== "number" || Number.isNaN(index)) {
    return 0;
  }

  return Math.min(Math.max(index, 0), checkoutSteps.length - 1);
}

export function useCheckout(initialStepIndex = 0) {
  const [currentStepIndex, setCurrentStepIndex] = useState(() =>
    clampStepIndex(initialStepIndex)
  );

  const currentStep = checkoutSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === checkoutSteps.length - 1;

  const goNext = useCallback(() => {
    setCurrentStepIndex((index) => clampStepIndex(index + 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStepIndex((index) => clampStepIndex(index - 1));
  }, []);

  const goToStep = useCallback((index) => {
    setCurrentStepIndex(clampStepIndex(index));
  }, []);

  const resetCheckout = useCallback(() => {
    setCurrentStepIndex(0);
  }, []);

  const stepProgress = useMemo(() => {
    return checkoutSteps.map((step, index) => {
      const isCompleted = index < currentStepIndex;
      const isActive = index === currentStepIndex;
      const isUpcoming = index > currentStepIndex;

      return {
        ...step,
        index,
        isCompleted,
        isActive,
        isUpcoming,
        status: isCompleted ? "completed" : isActive ? "active" : "upcoming"
      };
    });
  }, [currentStepIndex]);

  const progressPercentage =
    (currentStepIndex / (checkoutSteps.length - 1)) * 100;

  return {
    steps: checkoutSteps,
    stepProgress,
    currentStep,
    currentStepIndex,
    currentStepId: currentStep.id,
    currentStepLabel: currentStep.label,
    isFirstStep,
    isLastStep,
    progressPercentage,

    goNext,
    goBack,
    goToStep,
    resetCheckout
  };
}