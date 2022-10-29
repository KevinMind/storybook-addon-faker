import React, { ButtonHTMLAttributes } from "react";
import "./button.css";

export interface Props extends ButtonHTMLAttributes<{}> {
  label: string;
  size: "small" | "medium" | "large";
  backgroundColor?: string;
  primary?: boolean;
}

export const Button = ({
  primary = false,
  backgroundColor,
  size,
  label,
  ...props
}: Props) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={Boolean(backgroundColor) ? { backgroundColor } : {}}
      {...props}
    >
      {label}
    </button>
  );
};
