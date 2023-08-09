'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

// CONSTANTS
import { COMMUNITY_TABS, communityTabs } from '../../../../constants';

// SERVICES
import { getCommunityProfile } from '../../../../services/community/get-community-profile';

// COMPONENTS
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../components/ui/tabs';
import { UserCard } from '../../../../components/cards/user-card';
import { ThreadsTab } from '../../../../components/shared/threads-tab';
import { ProfileHeader } from '../../../../components/shared/profile-header';

interface CommunityPageProps {
	params: {
		id: string;
	};
}

const CommunityPage: NextPage<CommunityPageProps> = ({ params: { id } }) => {
	const { user } = useClerk();
	const [selectedTab, setSelectedTab] = useState<COMMUNITY_TABS>('Threads');
	const {
		data: result,
		refetch,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey: [`get-user-profile-${id}`, selectedTab],
		queryFn: async ({ queryKey }) => {
			return await getCommunityProfile(id, queryKey[1] as COMMUNITY_TABS);
		},
		enabled: false,
	});

	useEffect(() => {
		refetch();
	}, [id, refetch, selectedTab]);

	if (isFetching || isLoading) {
		return (
			<div className="w-full flex flex-col items-center justify-center mt-8">
				<Loader className="animate-spin text-primary-500 w-8 h-8 sm:w-10 sm:h-10" />
				<span className="font-semibold text-white">Loading...</span>
			</div>
		);
	}

	if (!result) {
		return (
			<div className="mt-20 flex items-center justify-center w-full">
				<h1 className="no-result">No result</h1>
			</div>
		);
	}

	const { profile, threads } = result;

	return (
		<section>
			<ProfileHeader
				profileInfo={{
					accountId: profile.id,
					authUserId: user?.id ?? '',
					name: profile.name,
					username: profile.username,
					imgUrl: profile.image,
					bio: profile.bio,
				}}
			/>

			<div className="mt-9">
				<Tabs
					defaultValue={selectedTab.toLowerCase()}
					className="w-full"
				>
					<TabsList className="tab">
						{communityTabs.map((tab) => (
							<TabsTrigger
								key={tab.label}
								value={tab.value}
								disabled={tab.label === 'Requests'}
								className="tab"
							>
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className="object-contain"
								/>
								<p className="max-sm:hidden">{tab.label}</p>

								{tab.label === selectedTab && (
									<p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
										{threads.length ?? 0}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>

					{communityTabs.map((tab) => (
						<TabsContent
							key={`content-${tab.label}`}
							value={tab.value}
							className="w-full text-light-1"
						>
							{tab.label === 'Threads' ? (
								<ThreadsTab
									currentUserId={user?.id ?? ''}
									threads={threads}
								/>
							) : (
								<section className="mt-9 flex-col gap-10">
									{profile.members.map((member) => (
										<UserCard
											key={member.id}
											id={member.id}
											name={member.name}
											username={member.username}
											imgUrl={member.profilePhoto}
											personType="User"
										/>
									))}
								</section>
							)}
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
};

export default CommunityPage;
