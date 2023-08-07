'use client';

import { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

// SERVICES
import { getUserActivity } from '../../../services/user/get-user-activity';

const ActivityPage: NextPage = () => {
	const { user, loaded } = useClerk();

	const { data, refetch } = useQuery(
		[`get-user-activity-${user?.id}`],
		async () => {
			return await getUserActivity(user?.id ?? '');
		},
		{
			enabled: false,
		},
	);

	const activity = data ?? [];

	useEffect(() => {
		if (loaded) {
			refetch();
		}
	}, [loaded, refetch]);

	return (
		<section>
			<h1 className="head-text mb-10">Activity</h1>

			<section className="mt-10 flex flex-col gap-5">
				{activity.length > 0 ? (
					<>
						{activity.map((activity) => (
							<Link
								key={activity.id}
								href={`/thread/${activity.parentThreadId}`}
							>
								<article className="activity-card">
									<Image
										src={activity.author.profilePhoto}
										alt="Profile Photo"
										width={40}
										height={40}
										priority
										className="rounded-full object-cover"
									/>

									<p className="!text-small-regular text-light-1">
										<span className="mr-1 text-primary-500">
											{activity.author.name}
										</span>{' '}
										replied your thread
									</p>
								</article>
							</Link>
						))}
					</>
				) : (
					<p className="!text-base-regular text-light-3">
						No activities yet
					</p>
				)}
			</section>
		</section>
	);
};

export default ActivityPage;
