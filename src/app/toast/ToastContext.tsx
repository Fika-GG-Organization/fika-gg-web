import { useCallback, useState } from "react";
import type { PropsWithChildren } from "react";
import type { ToastFunction, ToastType } from "./toast.types";
import { AUTO_HIDE_DURATION, ANCHOR_ORIGIN } from "./toast.constants";
import { ToastContext } from "./toast.context";
import ToastProgress from "./ui/ToastProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

export const ToastProvider = (props: PropsWithChildren) => {
	const [open, setOpen] = useState<boolean>(false);
	const [pendingToasts, setPendingToasts] = useState<readonly ToastType[]>([]);
	const [activeToast, setActiveToast] = useState<ToastType | undefined>(undefined);


	if (pendingToasts.length && !activeToast) {
		// If no toast is active, set first pending toast as active and remove it from pending list
		setActiveToast({ ...pendingToasts[0] });
		setPendingToasts((toasts) => toasts.slice(1));
		setOpen(true);
	} else if (pendingToasts.length && activeToast && open) {
		// Close the active toast when a new one opens.
		setOpen(false);
	}


	const addToast: ToastFunction = useCallback((message, options?) => {
		setPendingToasts((toasts) => [
			...toasts,
			{
				message: message,
				key: new Date().getTime(),
				// A progress bar will not show up if set to `null`
				autoHideDuration: options?.autoHideDuration === undefined ? AUTO_HIDE_DURATION : options.autoHideDuration,
				variant: options?.variant ?? "info",
			},
		]);
	}, []);

	return (
		<ToastContext.Provider value={{ toast: addToast }}>
			{props.children}
			{activeToast && (
				<Snackbar
					key={activeToast.key}
					open={open}
					anchorOrigin={ANCHOR_ORIGIN}
					autoHideDuration={activeToast.autoHideDuration}
					onClose={() => setOpen(false)}
					slotProps={{
						clickAwayListener: { mouseEvent: false }, // Prevents close when clicking outside the component.
						transition: { onExited: () => setActiveToast(undefined) }, // Resets after exit animation is completed.
					}}
				>
					<Alert
						onClose={() => setOpen(false)}
						icon={activeToast.variant !== "info" ? null : false }
						role={"status"}
						severity={activeToast.variant}
						variant={"standard"}
						sx={{ height: "90%" }}
					>
						<Stack sx={{ width: "100%", height: "100%", flexDirection: "column" }}>
							{activeToast.message ?? undefined}
							{activeToast.autoHideDuration && (
								<ToastProgress maxDuration={activeToast.autoHideDuration}/>
							)}
						</Stack>
					</Alert>
				</Snackbar>
			)}
		</ToastContext.Provider>
	);
};
