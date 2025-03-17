"use client";

import { useToast } from "@/hooks/use-toast";
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import { Icons } from "@/assets/svg";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({
				id,
				title,
				description,
				action,
				done,
				failed,
				...props
			}) {
				return (
					<Toast key={id} {...props}>
						<div className="flex items-start gap-1">
							{done && <Icons.Done width={24} height={24} />}
							{failed && <Icons.XCircle width={24} height={24} />}

							<div className="grid gap-1">
								{title && <ToastTitle>{title}</ToastTitle>}
								{description && (
									<ToastDescription>{description}</ToastDescription>
								)}
							</div>
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
