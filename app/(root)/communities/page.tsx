'use client';

import { NextPage } from 'next';
import { Loader } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

// SERVICES
import { listCommunities } from '../../../services/community/list-communities';

// COMPONENTS
import { CommunityCard } from '../../../components/cards/community-card';

const CommunityPage: NextPage = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetched,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery(
		[`infinite-search-feed`],
		async ({ pageParam = 0 }) => {
			return await listCommunities({
				skip: pageParam,
				take: '10',
			});
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

	const communities = data?.pages.flat() ?? [];

	return (
		<section>
			<h1 className="head-text mb-10">Communities</h1>

			{isFetching && (
				<div className="w-full flex flex-col items-center justify-center mt-8">
					<Loader className="animate-spin text-primary-500 w-8 h-8 sm:w-10 sm:h-10" />
					<span className="font-semibold text-white">Loading...</span>
				</div>
			)}

			<InfiniteScroll
				className="flex flex-col gap-4"
				dataLength={communities.length}
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
				<div className="mt-14 flex flex-col gap-9">
					{isFetched && communities.length === 0 && (
						<p className="no-result">No communities</p>
					)}

					{isFetched &&
						communities.length > 0 &&
						communities.map((community) => (
							<CommunityCard
								key={community.id}
								id={community.id}
								name={community.name}
								username={community.username}
								imgUrl={community.image}
								members={community.members}
							/>
						))}
				</div>
			</InfiniteScroll>
		</section>
	);
};

export default CommunityPage;
