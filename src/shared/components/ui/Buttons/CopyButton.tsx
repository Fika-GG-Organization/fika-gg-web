import { useCallback } from "react";
import Button, { type ButtonProps } from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { useToast } from "@/app/toast";

const LABEL_BUTTON_COPY = "Kopiera";
const TOAST_COPY_SUCCESS = "Kopierad";
const TOAST_COPY_FAILED = "Kunde inte kopiera";

interface CopyButtonProps extends ButtonProps {
  /** The string that will be copied to clipboard. If not set, button will be disabled. */
  copyText?: string | undefined;
  /** On which side an icon should appear, if at all. @default "left" */
  icon?: "left" | "right" | "none" | undefined;
  /** Set display text to have underline. @default false */
  underline?: boolean | undefined;
}

/**
 * Button that copies a string to clipboard.
 *
 * @example
 * interface ChildComponentProps {
 *   link: string;
 * }
 *
 * function ChildComponent(props: ChildComponentProps) {
 *   return <CopyButton copyText={props.link}> Copy to clipboard </CopyButton>
 * }
 *
 * @remarks
 * Implements {@linkcode isSecureContext}, which prevents copying to clipboard if
 * {@linkcode CopyButton} is rendered inside an insecure website.
 *
 * > ✅ Secure URLs
 * > * `https://example.com`
 * > * `http://localhost`
 * > * `file:///path/to/resource.html`
 *
 * > ❌ Not secure URLs
 * > * `http://example.com`
 *
 * NOTE: {@linkcode isSecureContext} does not check the contents of {@linkcode copyText},
 * so `http` URLs can still be copied to clipboard.
 *
 * @see {@link https://developer.mozilla.org/docs/Web/Security/Defenses/Secure_Contexts#why_should_some_features_be_restricted | mozilla.org/docs/Web/Security/Defenses/Secure_Contexts}
 */
const CopyButton = ({ copyText, icon = "left", underline = false, variant, ...props }: CopyButtonProps) => {
  const toast = useToast();

  const handleClick = useCallback(async () => {
    const failureToast = () => toast(TOAST_COPY_FAILED, { variant: "error", autoHideDuration: 3000 });
    const successToast = () => toast(TOAST_COPY_SUCCESS, { variant: "info", autoHideDuration: 3000 });

    if (!isSecureContext || !copyText) {
			failureToast();
			return;
		}
    try {
      await navigator.clipboard.writeText(copyText);
      successToast();
    } catch {
      failureToast();
    }
  }, [toast, copyText]);

  return (
    <Button
      {...props}
      aria-label={"Copy to clipboard."}
      disabled={(!isSecureContext || !copyText) ? true : false}
      onClick={handleClick}
      startIcon={
        icon === "left" ? copyText !== undefined ? <LinkIcon /> : <LinkOffIcon /> : undefined
      }
      endIcon={
        icon === "right" ? copyText !== undefined ? <LinkIcon /> : <LinkOffIcon /> : undefined
      }
      sx={underline === true ? { textDecorationLine: "underline" } : { textDecorationLine: "none" }}
      variant={variant ?? "outlined"}
    >
      {props.children ?? LABEL_BUTTON_COPY}
    </Button>
  );
};

export default CopyButton;
