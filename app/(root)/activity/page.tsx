'use client';

import { useEffect } from 'react';
import { NextPage } from 'next';
import { Loader } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// SERVICES
import { getUserActivity } from '../../../services/user/get-user-activity';
import Link from 'next/link';
import Image from 'next/image';

const ActivityPage: NextPage = () => {
	const { user, loaded } = useClerk();

	const { data, refetch, isFetching } = useQuery(
		[`get-user-activity-${user?.id}`],
		async () => {
			return await getUserActivity(user?.id ?? '');
		},
		{
			enabled: false,
		},
	);

	const activity = data ?? [];

	// const {
	// 	data,
	// 	refetch,
	// 	fetchNextPage,
	// 	hasNextPage,
	// 	isFetched,
	// 	isFetchingNextPage,
	// } = useInfiniteQuery(
	// 	[`infinite-user-activity-${user?.id}`],
	// 	async ({ pageParam = 0 }) => {
	// 		console.log('fetching...');
	// 		return await getUserActivity(user?.id ?? '');
	// 	},
	// 	{
	// 		getNextPageParam: (lastPage, pages) => {
	// 			if (lastPage?.length < 10) {
	// 				return false;
	// 			}

	// 			return pages.length + 1;
	// 		},
	// 		enabled: false,
	// 	},
	// );

	useEffect(() => {
		if (loaded) {
			refetch();
		}
	}, [loaded, refetch]);

	// const activity = data?.pages.flat() ?? [];

	console.log({ activity });

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
