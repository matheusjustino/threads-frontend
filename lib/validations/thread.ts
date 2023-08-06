import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

export const ThreadValidation = z.object({
	text: z
		.string()
		.min(3, { message: 'Thread must contain at least 3 character(s)' })
		.nonempty(),
	authorId: z.string().nonempty(),
});

export const CommentValidation = z.object({
	text: z.string().min(3).nonempty(),
});

export type ThreadValidationType = z.infer<
	typeof ThreadValidation & FieldValues
>;

export type CommentValidationType = z.infer<
	typeof CommentValidation & FieldValues
>;
