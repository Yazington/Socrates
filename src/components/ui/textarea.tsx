import React, { useState, useRef, useEffect } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  children?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    const [value, setValue] = useState(props.value || props.defaultValue || "");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className={`relative ${containerClassName}`}>
        <div className="rounded-lg border border-input bg-transparent shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring">
          <textarea
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              textareaRef.current = node;
            }}
            className={`block w-full resize-none rounded-lg bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
            value={value}
            onChange={handleChange}
          />
          {children && (
            <div className="border-t border-input bg-transparent px-3 py-2">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
