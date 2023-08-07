'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

// VALIDATIONS
import { UserValidation, UserValidationType } from '../../lib/validations/user';

// LIBS
import { api, internalApi } from '../../lib/axios';

// COMPONENTS
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useToast } from '../ui/use-toast';

interface AccountProfileProps {
	user: {
		id?: string;
		objectId?: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}

const AccountProfile: React.FC<AccountProfileProps> = ({ user, btnTitle }) => {
	const pathname = usePathname();
	const { back, push } = useRouter();
	const { toast } = useToast();
	const [files, setFiles] = useState<File[]>([]);
	const form = useForm<UserValidationType>({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			name: user?.name || '',
			username: user?.username || '',
			bio: user?.bio || '',
			profilePhoto: user?.image || '',
		},
	});

	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void,
	): void => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files?.length) {
			const file = e.target.files[0];
			setFiles(Array.from(e.target.files));

			if (!file.type.includes('image')) return;

			fileReader.onload = async (event) => {
				const imageDataUrl = event.target?.result?.toString() || '';
				fieldChange(imageDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};

	const onSubmit: SubmitHandler<UserValidationType> = useCallback(
		async (data, event) => {
			event?.preventDefault();

			const formData = new FormData();
			Object.entries(data).forEach(([key, val]) =>
				formData.append(key, val),
			);

			if (files[0]?.length) {
				formData.append('profilePhoto', files[0]);
			} else {
				const clerkImage = await fetch(data.profilePhoto);
				const blob = await clerkImage.blob();
				const newFile = new File(
					[blob],
					`clerk-avatar-${user.id}.jpg`,
					{
						type: blob.type,
					},
				);
				formData.append('profilePhoto', newFile);
			}

			await api
				.patch(`/users/${user.id}`, formData)
				.then(async () => {
					const body = {
						pathname,
					};
					await internalApi.put(`/users/`, body);
					toast({
						title: 'Success',
						description: 'Profile updated successfully',
					});
					setTimeout(() => {
						if (pathname === '/profile/edit') {
							back();
						} else {
							push('/');
						}
					}, 500);
				})
				.catch((error: any) => {
					console.error(error);
					toast({
						title: 'Error',
						description: 'Something went wrong',
						variant: 'destructive',
					});
				});
		},
		[user.id, back, push, pathname, files, toast],
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-start gap-10 text-white"
			>
				<FormField
					control={form.control}
					name="profilePhoto"
					render={({ field }) => (
						<FormItem className="flex items-center gap-4">
							<FormLabel className="account-form_image-label">
								{field.value ? (
									<Image
										src={field.value}
										alt="User photo"
										width={96}
										height={96}
										priority
										className="rounded-full object-contain"
									/>
								) : (
									<Image
										src="/assets/profile.svg"
										alt="User photo"
										width={24}
										height={24}
										className="object-contain"
									/>
								)}
							</FormLabel>
							<FormControl className="flex-1 text-base-semibold text-gray-200">
								<Input
									id="profilePhoto"
									type="file"
									accept="image/*"
									placeholder="Upload a photo"
									className="account-form_image-input"
									register={form.register('profilePhoto', {
										required: true,
									})}
									errors={form.formState.errors}
									onChange={(e) =>
										handleImage(e, field.onChange)
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1 w-full">
							<FormLabel className="text-base-semibold text-light-2">
								Name
							</FormLabel>
							<FormControl>
								<Input
									id="name"
									type="text"
									className="account-form_input no-focus"
									register={form.register('name', {
										required: true,
									})}
									errors={form.formState.errors}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1 w-full">
							<FormLabel className="text-base-semibold text-light-2">
								Username
							</FormLabel>
							<FormControl>
								<Input
									id="username"
									type="text"
									className="account-form_input no-focus"
									register={form.register('username', {
										required: true,
									})}
									errors={form.formState.errors}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1 w-full">
							<FormLabel className="text-base-semibold text-light-2">
								Bio
							</FormLabel>
							<FormControl>
								<Textarea
									id="bio"
									rows={3}
									className="account-form_input no-focus"
									register={form.register('bio', {
										required: true,
									})}
									errors={form.formState.errors}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button>Submit</Button>
			</form>
		</Form>
	);
};

export { AccountProfile };
