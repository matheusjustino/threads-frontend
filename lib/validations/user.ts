import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

export const UserValidation = z.object({
	profilePhoto: z.string().url().nonempty(),
	name: z.string().min(3).max(30),
	username: z.string().min(3).max(30),
	bio: z.string().min(3).max(1000),
});

export type UserValidationType = z.infer<typeof UserValidation & FieldValues>;
