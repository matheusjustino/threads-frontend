import * as React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

import { cn } from '../../lib/utils';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	register: UseFormRegisterReturn<string>;
	errors: FieldErrors;
	icon?: LucideIcon;
	iconSize?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			id,
			label,
			register,
			errors,
			icon: Icon,
			iconSize,
			className,
			...props
		},
		ref,
	) => {
		return (
			<div className="flex flex-col gap-2">
				<label
					className="flex items-center gap-2"
					htmlFor={register.name}
				>
					<>
						{Icon && <Icon size={iconSize ?? 20} />} {label}
					</>
				</label>
				<textarea
					className={cn(
						'flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800',
						className,
					)}
					ref={ref}
					{...props}
				/>

				{id && errors[id] && (
					<span className="text-[10px] sm:text-[12px] text-red-400">
						{errors[id]?.message?.toString() ?? 'Error'}
					</span>
				)}
			</div>
		);
	},
);
Textarea.displayName = 'Textarea';

export { Textarea };
