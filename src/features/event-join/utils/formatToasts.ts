import { ERROR_MESSAGE, JOIN_ERROR_400_MESSAGE } from "../config/constants";
import type { ToastFunction } from "@/app/toast/toast.types";

/** Fallback toast for generic errors. */
export function formatErrorToast(toast: ToastFunction) {
	toast(ERROR_MESSAGE, {variant: "error"});
}

/** Toast for when user is already in the event participant list. */
export function formatAlreadyJoinedErrorToast(toast: ToastFunction) {
	toast(JOIN_ERROR_400_MESSAGE, {variant: "error"});
}
