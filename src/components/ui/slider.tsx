"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex w-full touch-none select-none items-center",
			className,
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
			<SliderPrimitive.Range className="absolute h-full bg-[#96bcf1]" />
		</SliderPrimitive.Track>
		{/* Первый круг */}
		<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-[var(--brand-primary)] shadow transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
		{/* Второй круг */}
		<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-[var(--brand-primary)] shadow transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
