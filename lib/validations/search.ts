import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

export const SearchValidation = z.object({
	searchTerm: z
		.string()
		.min(3, { message: 'Search must contain at least 1 character(s)' })
		.nonempty(),
});

export type SearchValidationType = z.infer<
	typeof SearchValidation & FieldValues
>;
