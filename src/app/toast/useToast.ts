import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import { USE_TOAST_ERROR_MESSAGE } from "./toast.constants";

/**
 * Returns a function that lets components write a toast pop-up when
 * interacted by the user.
 *
 * @description
 * Toasts are temporary pop-up boxes appearing outside the regular
 * document flow.
 * They are intended to provide response feedback to app processes
 * or user interactions (for example: when copying a link, when
 * getting server response, or when a non-critical error occurs).
 *
 * Toasts are supposed to be ignorable, and should **NOT** be used to
 * display critical information that require attention or actions
 * from the user.
 *
 * @example
 * Here's a barebones example of a button that writes a toast when clicked.
 *
 * ```tsx
 * import { useToast } from "@/app/toast";
 *
 * function YourButton() {
 *   const toast = useToast();
 *   return (
 *     <button onClick={() => toast("Copied!")}>
 *       Copy link to clipboard
 *     </button>
 *   );
 * }
 * ```
 * @example
 * The returned function signature is `toast(message, options?)`, where:
 * * `message` — String that is displayed on the toast component.
 * * `options?` — Configure the style and behaviour of the toast component.
 *   * `autoHideDuration?` — The number of milliseconds to wait before 
 *     automatically hiding the toast component. Set to `null` to disable
 *     this behaviour.
 *   * `variant?` — Sets the color and icon of the toast component.
 *
 * Here's an example on how to include the optional `options` parameter.
 * 
 * ```tsx
 * toast("404 Not Found", { autoHideDuration: null, variant: "warning" });
 * ```
 * @example
 * Use a function to provide multiple components with the same toast.
 *
 * ```tsx
 * function YourComponent() {
 *   const toast = useToast();
 *   function handleClick(message) {
 *     toast(message, { variant: "success" });
 *   }
 *   return (
 *     <div>
 *       <button onClick={() => handleClick("I was pressed!")}>Click me</button>
 *       <button onClick={() => handleClick("I was pressed too!")}>Or me</button>
 *       <button onClick={() => handleClick("I also was pressed!")}>Me as well</button>
 *     </div>
 *   );
 * }
 * ```
 * @returns A function for adding toast pop-ups programmatically.
 */
export const useToast = () => {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error(USE_TOAST_ERROR_MESSAGE);
	}
	return context.toast;
};
