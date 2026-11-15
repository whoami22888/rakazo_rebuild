import type { BillingStatus } from "@rakazo/contracts";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

const BillingContext = createContext<{ status: BillingStatus | null; showPlans: () => void }>({
  status: null,
  showPlans: () => undefined,
});

/** The latest billing status (`null` when the deployment does not bill) and the plan choice. */
export function useBilling() {
  return useContext(BillingContext);
}

/**
 * Paywall gating removed so the core product runs without a subscription.
 * Billing status remains available from the API when needed by settings surfaces.
 */
export function SubscriptionGate({
  children,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <BillingContext.Provider value={{ status: null, showPlans: () => undefined }}>
      {children}
    </BillingContext.Provider>
  );
}
