import { useId, useState } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LABEL_PASSWORD = "Lösenord";
const ARIA_LABEL_SHOWN_TRUE = "Hide password characters";
const ARIA_LABEL_SHOWN_FALSE = "Show password characters";

export type PasswordInputProps = TextFieldProps & {
  /**
   * Set if the input will have a 'show password' button or not.
   * @default true
   */
  showPasswordButton?: boolean | undefined;
};

/**
 * Password input field. Set {@linkcode showPasswordButton} to toggle
 * 'show button' on or off.
 * @param props Extends {@linkcode TextFieldProps}, which allows you
 * to treat this component as a {@linkcode TextField}.
 */
const PasswordInput = ({ showPasswordButton = true, ...props }: PasswordInputProps) => {
  const defaultId = useId();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const endAdornment = (
    <InputAdornment position={"end"}>
      <IconButton
        aria-label={showPassword ? ARIA_LABEL_SHOWN_TRUE : ARIA_LABEL_SHOWN_FALSE}
        edge={"end"}
        onClick={() => setShowPassword((show) => !show)}
        onMouseDown={(e) => e.preventDefault()}
        onMouseUp={(e) => e.preventDefault()}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      {...props}
      fullWidth={props.fullWidth ?? true}
      id={props.id ?? `password-${defaultId}`}
      label={props.label ?? LABEL_PASSWORD}
      required={props.required ?? true}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: showPasswordButton ? endAdornment : undefined,
        },
      }}
    />
  );
};

export default PasswordInput;
