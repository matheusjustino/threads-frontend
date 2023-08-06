import * as React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

import { cn } from '../../lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	register: UseFormRegisterReturn<string>;
	errors: FieldErrors;
	icon?: LucideIcon | (() => JSX.Element);
	iconSize?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			id,
			label = '',
			register,
			errors,
			icon: Icon,
			iconSize,
			...props
		},
		ref,
	) => {
		return (
			<>
				<div className="flex flex-col gap-2">
					<label
						className="flex items-center gap-2 text-black dark:text-white"
						htmlFor={register.name}
					>
						<>
							{Icon && <Icon size={iconSize ?? 20} />} {label}
						</>
					</label>
					<input
						type={type}
						className={cn(
							'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800',
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
			</>
		);
	},
);
Input.displayName = 'Input';

export { Input };
