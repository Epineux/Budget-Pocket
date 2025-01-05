// This component is modified from the original Shadcn UI component.

"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Trigger the animation after component mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 rounded transition-all duration-1000 ease-in-out [background:var(--progress-indicator-color,theme(colors.neutral.900))] dark:[background:var(--progress-indicator-color,theme(colors.neutral.50))]"
        style={{
          transform: `translateX(-${100 - (isVisible ? value || 0 : 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
