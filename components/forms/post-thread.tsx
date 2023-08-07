'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useOrganization } from '@clerk/nextjs';

// VALIDATIONS
import {
	ThreadValidation,
	ThreadValidationType,
} from '../../lib/validations/thread';

// SERVICES
import { createThread } from '../../services/thead/create-thread';

// LIBS
import { internalApi } from '../../lib/axios';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

// COMPONENTS
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';

interface PostThreadProps {
	userId: string;
}

const PostThread: React.FC<PostThreadProps> = ({ userId }) => {
	const pathname = usePathname();
	const { push } = useRouter();
	const { toast } = useToast();
	const { organization } = useOrganization();
	const queryClient = useQueryClient();
	const form = useForm<ThreadValidationType>({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			text: '',
			authorId: userId,
		},
	});

	const onSubmit: SubmitHandler<ThreadValidationType> = useCallback(
		async (data, event) => {
			event?.preventDefault();

			await createThread({
				...data,
				communityId: organization?.id || null,
			})
				.then(async (res) => {
					toast({
						title: 'Success',
						description: 'Thread created successfully',
					});

					queryClient.setQueryData(
						[`infinite-threads-feed`],
						(oldData?: { pages: ThreadInterface[] }) => {
							if (!oldData) return oldData;

							oldData.pages = [res, ...oldData.pages];
							return oldData;
						},
					);

					await internalApi.post(`/threads`, { pathname });
					form.reset();

					setTimeout(() => push('/'), 500);
				})
				.catch((error) => {
					console.error(error);
					toast({
						title: 'Error',
						description: 'Something went wrong',
						variant: 'destructive',
					});
				});
		},
		[toast, form, pathname, push, queryClient, organization],
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-10 flex flex-col justify-start gap-10 text-white"
			>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1 w-full">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>
							<FormControl>
								<Textarea
									id="text"
									rows={12}
									className="no-focus border border-dark-4 bg-dark-3 text-light-1"
									register={form.register('text', {
										required: true,
									})}
									errors={form.formState.errors}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit" className="bg-primary-500">
					Post Thread
				</Button>
			</form>
		</Form>
	);
};

export { PostThread };
