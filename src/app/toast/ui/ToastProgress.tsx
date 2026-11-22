import { useEffect, useRef, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

export interface ToastProgress {
	maxDuration: number;
}

/**
 * Progress bar for toast.
 *
 * @remarks
 * There's currently a bug with `timerRef.current`. It doesn't seem to reset, so eventually there
 * might be an overflow/out-of-range error. Luckily it will if the page is reloaded.
 */
export default function ToastProgress(props: ToastProgress) {
	const [progress, setProgress] = useState<number>(0);
	const timerRef = useRef(progress);

	useEffect(() => {
		timerRef.current = setInterval(() => {
			if (document.hasFocus()) {
				setProgress((prev) => prev + 100);
			}
		}, 100);
		return (() => {
			clearInterval(timerRef.current);
		})
	}, []);

	useEffect(() => {
		if (progress >= props.maxDuration) {
			clearInterval(timerRef.current);
		}
	}, [progress, props.maxDuration])

	return (
		<Box sx={{ width: "100%", pY: 8 }}>
			<LinearProgress
				color={"info"}
				max={props.maxDuration}
				min={0}
				value={progress}
				variant={"determinate"}
			/>
		</Box>
	);
}
