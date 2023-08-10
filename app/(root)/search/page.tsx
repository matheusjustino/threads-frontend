'use client';

import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Loader } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import debounce from 'lodash.debounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

// SERVICES
import { listUsers } from '../../../services/user/list-users';

// COMPONENTS
import { Input } from '../../../components/ui/input';
import { UserCard } from '../../../components/cards/user-card';

const SearchPage: NextPage = () => {
	const { user, loaded } = useClerk();
	const [searchInput, setSearchInput] = useState<string>('');

	const {
		data,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetched,
		isFetchingNextPage,
	} = useInfiniteQuery(
		[`infinite-search-feed`, searchInput],
		async ({ pageParam = 0, queryKey }) => {
			if (!searchInput.trim().length) {
				return [];
			}

			return await listUsers({
				userId: user?.id ?? '',
				skip: pageParam,
				searchTerm: queryKey[1],
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

	const fetchUsers = debounce(() => {
		refetch();
	}, 500);

	useEffect(() => {
		if (loaded) {
			fetchUsers();
		}
	}, [loaded]);

	const debouncedFetchUsers = useCallback(() => {
		fetchUsers();
	}, []);

	const users = data?.pages.flat() ?? [];

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			<Input
				id="searchTerm"
				name="searchTerm"
				value={searchInput}
				onChange={(v) => {
					setSearchInput(v.target.value);
					debouncedFetchUsers();
				}}
				className="no-focus border border-dark-4 bg-dark-3 text-light-1"
				placeholder="Search..."
			/>

			{!loaded && (
				<div className="w-full flex flex-col items-center justify-center mt-8">
					<Loader className="animate-spin text-primary-500 w-8 h-8 sm:w-10 sm:h-10" />
					<span className="font-semibold text-white">Loading...</span>
				</div>
			)}

			{loaded && (
				<InfiniteScroll
					className="flex flex-col gap-4"
					dataLength={users.length}
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
						{isFetched && users.length === 0 && (
							<p className="no-result">No users</p>
						)}

						{isFetched &&
							users.length > 0 &&
							users.map((user) => (
								<UserCard
									key={user.id}
									id={user.id}
									name={user.name}
									username={user.username}
									imgUrl={user.profilePhoto}
									personType="User"
								/>
							))}
					</div>
				</InfiniteScroll>
			)}
		</section>
	);
};

export default SearchPage;
