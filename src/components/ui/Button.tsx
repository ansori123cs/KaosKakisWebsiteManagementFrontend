import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 justify-center ";

    const variants = {
      primary:
        "bg-persebaya-primary text-white hover:bg-persebaya-primary-hover disabled:bg-persebaya-primary/70",
      secondary:
        "bg-persebaya-secondary text-persebaya-text hover:bg-gray-300 disabled:bg-gray-100",
      ghost: "text-persebaya-text hover:bg-persebaya-bg disabled:text-gray-400",
      danger:
        "bg-persebaya-error text-white hover:bg-red-700 disabled:bg-red-400",
    };

    const sizes = {
      sm: "px-2 py-1.5 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
            Loading...
          </>
        ) : (
          <>
            {icon && <span className="flex items-center">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
