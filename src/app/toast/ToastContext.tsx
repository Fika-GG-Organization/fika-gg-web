import { createContext, useCallback, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import type { ToastContextType, ToastFunction, ToastType } from "./toast.types";
import { AUTO_HIDE_DURATION, ANCHOR_ORIGIN } from "./toast.constants";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = (props: PropsWithChildren) => {
	const [open, setOpen] = useState<boolean>(false);
	const [pendingToasts, setPendingToasts] = useState<readonly ToastType[]>([]);
	const [activeToast, setActiveToast] = useState<ToastType | undefined>(undefined);

	useEffect(() => {
		if (pendingToasts.length && !activeToast) {
			console.log(
				`New toast:\n` +
					`  key:     ${pendingToasts[pendingToasts.length - 1].key.toString()}\n` +
					`  message: '${pendingToasts[pendingToasts.length - 1].message}'`,
			);

			// If no toast is active, set first pending toast as active and remove it from pending list
			setActiveToast({ ...pendingToasts[0] });
			setPendingToasts((toasts) => toasts.slice(1));
			setOpen(true);
		} else if (pendingToasts.length && activeToast && open) {
			// Close the active toast when a new one opens.
			setOpen(false);
		}
	}, [pendingToasts, activeToast, open]);

	const addToast: ToastFunction = useCallback((message, options?) => {
		setPendingToasts((toasts) => [
			...toasts,
			{
				message: message,
				key: new Date().getTime(),
				autoHideDuration: options?.autoHideDuration,
				variant: options?.variant ?? "info",
			},
		]);
	}, []);

	return (
		<ToastContext.Provider value={{ toast: addToast }}>
			{props.children}
			<Snackbar
				key={activeToast ? activeToast.key : undefined}
				open={open}
				anchorOrigin={ANCHOR_ORIGIN}
				autoHideDuration={activeToast?.autoHideDuration ?? AUTO_HIDE_DURATION}
				onClose={() => setOpen(false)}
				slotProps={{
					clickAwayListener: { mouseEvent: false }, // Prevents close when clicking outside the component.
					transition: { onExited: () => setActiveToast(undefined) }, // Resets after exit animation is completed.
				}}
			>
				<Alert
					onClose={() => setOpen(false)}
					icon={activeToast?.variant !== "info" ? null : false }
					role={"status"}
					severity={activeToast?.variant}
					variant={"standard"}
				>
					{activeToast ? activeToast.message : undefined}
				</Alert>
			</Snackbar>
		</ToastContext.Provider>
	);
};
