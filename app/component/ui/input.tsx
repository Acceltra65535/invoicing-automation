import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, name, ...props }, ref) => {
    const inputId = id || name || label;
    const inputName = name || label;
    return (
      <div
        className={`flex  items-center relative ${
          label ? "h-[52px]" : "h-[42px]"
        }`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium leading-6 text-gray-900 whitespace-nowrap"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          {...props}
          name={inputName}
          id={inputId}
          className={`peer block w-full border-0 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 ${
            label ? "text-right" : "p-0"
          }  placeholder:text-neutral-700/40 placeholder:font-medium caret-orange-500`}
        />
        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-hover:border-neutral-400 peer-focus:border-t peer-focus:border-orange-500 border-dashed"
          aria-hidden="true"
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
