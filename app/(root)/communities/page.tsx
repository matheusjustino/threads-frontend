'use client';

import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Loader } from 'lucide-react';
import debounce from 'lodash.debounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

// SERVICES
import { listCommunities } from '../../../services/community/list-communities';

// COMPONENTS
import { Input } from '../../../components/ui/input';
import { CommunityCard } from '../../../components/cards/community-card';

const CommunityPage: NextPage = () => {
	const [searchInput, setSearchInput] = useState<string>('');

	const {
		data,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetched,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery(
		[`infinite-search-feed`],
		async ({ pageParam = 0 }) => {
			if (!searchInput.trim().length) {
				return [];
			}

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
			enabled: false,
		},
	);

	const fetchCommunities = debounce(() => {
		refetch();
	}, 500);

	useEffect(() => {
		fetchCommunities();
	}, []);

	const debouncedFetchCommunities = useCallback(() => {
		fetchCommunities();
	}, []);

	const communities = data?.pages.flat() ?? [];

	return (
		<section>
			<h1 className="head-text mb-10">Communities</h1>

			<Input
				id="searchTerm"
				name="searchTerm"
				value={searchInput}
				onChange={(v) => {
					setSearchInput(v.target.value);
					debouncedFetchCommunities();
				}}
				className="no-focus border border-dark-4 bg-dark-3 text-light-1"
				placeholder="Search..."
			/>

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
								members={community.members.map(
									(communityMember) => communityMember.member,
								)}
							/>
						))}
				</div>
			</InfiniteScroll>
		</section>
	);
};

export default CommunityPage;
