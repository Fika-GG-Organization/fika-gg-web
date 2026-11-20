import { ERROR_MESSAGE, JOIN_ERROR_400_MESSAGE, LEAVE_ERROR_IS_OWNER } from "../config/constants";
import type { ToastFunction } from "@/app/toast/toast.types";

/** Fallback toast for generic errors. */
export function formatErrorToast(toast: ToastFunction) {
	toast(ERROR_MESSAGE, {variant: "error"});
}

/** Toast for when user is already in the event participant list. */
export function formatAlreadyJoinedErrorToast(toast: ToastFunction) {
	toast(JOIN_ERROR_400_MESSAGE, {variant: "error"});
}

export function formatCannotLeaveAsOwnerToast(toast: ToastFunction) {
	toast(LEAVE_ERROR_IS_OWNER, {variant: "warning"});
}
