'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

// VALIDATIONS
import {
	CommentValidation,
	CommentValidationType,
} from '../../lib/validations/thread';

// LIBS
import { internalApi } from '../../lib/axios';

// SERVICES
import { addCommentToThread } from '../../services/thead/add-comment-to-thread';

// COMPONENTS
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';

interface CommentProps {
	threadId: string;
	currentUserId: string;
	currentUserImg: string;
}

const Comment: React.FC<CommentProps> = ({
	threadId,
	currentUserId,
	currentUserImg,
}) => {
	const pathname = usePathname();
	const { refresh } = useRouter();
	const { toast } = useToast();
	const form = useForm<CommentValidationType>({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			text: '',
		},
	});

	const onSubmit: SubmitHandler<CommentValidationType> = useCallback(
		async (data, event) => {
			event?.preventDefault();

			try {
				await addCommentToThread({
					text: data.text,
					threadId: threadId,
					userId: currentUserId,
				});

				form.reset();

				toast({
					title: 'Success',
					description: 'Comment added successfully',
				});

				await internalApi.post(`/threads/${threadId}`, { pathname });
				refresh();
			} catch (error) {
				console.error(error);
				toast({
					title: 'Error',
					description: 'Something went wrong',
					variant: 'destructive',
				});
			}
		},
		[threadId, currentUserId, toast, pathname, form, refresh],
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="comment-form"
			>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem className="flex items-center gap-1 w-full">
							<FormLabel>
								<Image
									src={currentUserImg}
									alt="Profile Image"
									width={48}
									height={48}
									className="rounded-full object-cover"
								/>
							</FormLabel>
							<FormControl className="border-none bg-transparent">
								<Input
									id="text"
									placeholder="Comment..."
									className="no-focus border text-light-1 outline-none"
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

				<Button type="submit" className="comment-form_btn">
					Reply
				</Button>
			</form>
		</Form>
	);
};

export { Comment };
