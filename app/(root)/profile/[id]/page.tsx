'use client';

import { memo, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';

// CONSTANTS
import { PROFILE_TABS, profileTabs } from '../../../../constants';

// SERVICES
import { getUserProfile } from '../../../../services/profile/get-user-profile';

// COMPONENTS
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../components/ui/tabs';
import { ThreadsTab } from '../../../../components/shared/threads-tab';
import { ProfileHeader } from '../../../../components/shared/profile-header';

interface ProfilePageProps {
	params: {
		id: string;
	};
}

const ProfilePage: NextPage<ProfilePageProps> = memo(({ params: { id } }) => {
	const { user } = useClerk();
	const [selectedTab, setSelectedTab] = useState<PROFILE_TABS>('Threads');
	const {
		data: result,
		refetch,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey: [`get-user-profile-${id}`, selectedTab],
		queryFn: async ({ queryKey }) => {
			return await getUserProfile(id, queryKey[1] as PROFILE_TABS);
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

	if (!result?.profile.onboarded) {
		redirect('/onboarding');
		return null;
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
					accountId: id,
					authUserId: user?.id ?? '',
					name: profile.name,
					username: profile.username,
					imgUrl: profile.profilePhoto,
					bio: profile.bio,
				}}
			/>

			<div className="mt-9">
				<Tabs
					defaultValue={selectedTab.toLowerCase()}
					className="w-full"
				>
					<TabsList className="tab">
						{profileTabs.map((tab) => (
							<TabsTrigger
								key={tab.label}
								value={tab.value}
								onClick={() => {
									setSelectedTab(tab.label as PROFILE_TABS);
								}}
								disabled={tab.label === 'Tagged'}
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

					{profileTabs.map((tab) => (
						<TabsContent
							key={`content-${tab.label}`}
							value={tab.value}
							className="w-full text-light-1"
						>
							<ThreadsTab
								currentUserId={user?.id ?? ''}
								threads={threads}
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
});

ProfilePage.displayName = 'ProfilePage';

export default ProfilePage;
