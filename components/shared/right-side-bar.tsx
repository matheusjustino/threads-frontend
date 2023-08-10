'use client';

import { Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// SERVICES
import { getSuggestUsers } from '../../services/user/get-suggest-users';
import { getSuggestCommunities } from '../../services/community/get-suggest-Communities';

// COMPONENTS
import { UserCard } from '../cards/user-card';
import { CommunityCard } from '../cards/community-card';

const RightSideBar: React.FC = () => {
	const { data: users, isFetching: isFetchingUsers } = useQuery({
		queryKey: [`get-suggest-users`],
		queryFn: async () => await getSuggestUsers(),
	});
	const { data: communities, isFetching: isFetchingCommunities } = useQuery({
		queryKey: [`get-suggest-communities`],
		queryFn: async () => await getSuggestCommunities(),
	});

	return (
		<section className="custom-scrollbar rightsidebar">
			<div className="flex flex-1 flex-col justify-start gap-4">
				<h3 className="text-heading4-medium text-light-1">
					Suggested Communities
				</h3>

				{isFetchingCommunities && (
					<div className="w-full flex flex-col items-center justify-center mt-8">
						<Loader className="animate-spin text-primary-500 w-8 h-8 sm:w-10 sm:h-10" />
					</div>
				)}
				{communities?.map((community) => (
					<CommunityCard
						key={community.id}
						id={community.id}
						name={community.name}
						username={community.username}
						imgUrl={community.image}
						members={[]}
					/>
				))}
			</div>

			<div className="flex flex-1 flex-col justify-start gap-4">
				<h3 className="text-heading4-medium text-light-1">
					Suggested Users
				</h3>

				{isFetchingUsers && (
					<div className="w-full flex flex-col items-center justify-center mt-8">
						<Loader className="animate-spin text-primary-500 w-8 h-8 sm:w-10 sm:h-10" />
					</div>
				)}

				{users?.map((user) => (
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
		</section>
	);
};

export { RightSideBar };
