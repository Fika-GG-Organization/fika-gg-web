import type { AlertColor, AlertPropsColorOverrides } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import type { OverridableStringUnion } from "@mui/types";

/** Interface for the context. */
export interface ToastContextType {
	toast: ToastFunction;
}

/** Interface for the {@linkcode ToastContextType.toast} function. */
export interface ToastFunction {
	(message: string, options?: ToastOptions): void | Promise<void>;
}

/** Interface for the options params in {@linkcode ToastFunction}. */
interface ToastOptions {
	/**
	 * The number of milliseconds to wait before automatically hiding the toast component.
	 * Set to `null` to disable this behaviour.
	 */
	autoHideDuration?: number | null | undefined;
	/**
	 * Sets the color and icon of the toast component.
	 * @default "info"
	 */
	variant?: ToastVariant | undefined;
}

/** Type for adding toast component. */
export type ToastType = {
	autoHideDuration?: number | null | undefined;
	key: number;
	message: string;
	Transition?: React.ComponentType<TransitionProps> | undefined;
	variant?: ToastVariant | undefined;
};

type ToastVariant = OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;