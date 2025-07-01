import React from 'react';
import classNames from 'classnames';

export function Button({ children, onClick, variant = "default", size = "md", className = "", ...props }) {
  const baseStyles = "rounded px-4 py-2 font-medium focus:outline-none transition";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "text-sm py-1 px-2",
    md: "text-base",
    lg: "text-lg py-3 px-5",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
