import {
  ERROR_MESSAGE,
  JOIN_ERROR_400_MESSAGE,
  JOIN_SUCCESS,
  LEAVE_ERROR_IS_OWNER,
  LEAVE_SUCCESS,
} from "../config/constants";
import { type ToastFunction } from "@/app/toast/toast.types";

export function formatJoinSuccessToast(toast: ToastFunction) {
  toast(JOIN_SUCCESS, { variant: "success" });
}

/** Writes toasts on join errors. */
export function formatJoinErrorToast(statusCode: number | undefined, toast: ToastFunction) {
  switch (statusCode) {
    case 400:
      toast(JOIN_ERROR_400_MESSAGE, { variant: "error" });
      break;
    default:
      toast(ERROR_MESSAGE, { variant: "error" });
      break;
  }
}

export function formatLeaveSuccessToast(toast: ToastFunction) {
  toast(LEAVE_SUCCESS, { variant: "success" });
}

/** Writes toasts on leave errors. */
export function formatLeaveErrorToast(statusCode: number | undefined, toast: ToastFunction) {
  switch (statusCode) {
    case 400:
      toast(LEAVE_ERROR_IS_OWNER, { variant: "warning" });
      break;
    default:
      toast(ERROR_MESSAGE, { variant: "error" });
      break;
  }
}
