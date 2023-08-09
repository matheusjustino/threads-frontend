'use client';

import { NextPage } from 'next';
import { useClerk } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

// SERVICES
import { listThreads } from '../../services/thead/list-threads';

// COMPONENTS
import { ThreadCard } from '../../components/cards/thread-card';

const HomePage: NextPage = () => {
	const userClerk = useClerk();
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetched,
		isFetchingNextPage,
	} = useInfiniteQuery(
		[`infinite-threads-feed`],
		async ({ pageParam = 0 }) => {
			return (await listThreads({ skip: pageParam, take: '10' })) ?? [];
		},
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage?.length < 10) {
					return false;
				}

				return pages.length + 1;
			},
		},
	);

	const threads = data?.pages.flat() ?? [];

	return (
		<>
			<h1 className="head-text text-left mb-10">Home</h1>

			{isFetching && (
				<div className="w-full flex flex-col items-center justify-center mt-8">
					<Loader className="animate-spin text-primary-500 w-8 h-8 sm:w-10 sm:h-10" />
					<span className="font-semibold text-white">Loading...</span>
				</div>
			)}

			<InfiniteScroll
				className="flex flex-col gap-4"
				dataLength={threads.length}
				hasMore={!!hasNextPage}
				next={fetchNextPage}
				loader={
					isFetchingNextPage && (
						<div className="w-full flex flex-col items-center justify-center mt-8">
							<Loader className="animate-spin text-primary-500 w-8 h-8 sm:w-10 sm:h-10" />
							<span className="font-semibold text-white">
								Loading...
							</span>
						</div>
					)
				}
			>
				{isFetched && threads.length === 0 && (
					<p className="no-result">No threads found</p>
				)}

				{isFetched &&
					threads.length > 0 &&
					threads.map((thread) => (
						<ThreadCard
							key={thread.id}
							thread={thread}
							currentUserId={userClerk.user?.id ?? ''}
						/>
					))}
			</InfiniteScroll>
		</>
	);
};

export default HomePage;
