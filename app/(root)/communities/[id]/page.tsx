import { NextPage } from 'next';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';

// CONSTANTS
import { communityTabs } from '../../../../constants';

// SERVICES
import { getCommunity } from '../../../../services/community/get-community';

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

const CommunityPage: NextPage<CommunityPageProps> = async ({
	params: { id },
}) => {
	const clerkUser = await currentUser();
	if (!clerkUser) {
		return null;
	}

	const community = await getCommunity(id).catch((error) => {
		console.error(error.response);
		return null;
	});
	if (!community) {
		return (
			<div>
				<h4 className="no-result">Community not found</h4>
			</div>
		);
	}

	return (
		<section>
			<ProfileHeader
				profileInfo={{
					accountId: community.id,
					authUserId: clerkUser.id,
					name: community.name,
					username: community.username,
					imgUrl: community.image,
					bio: community.bio,
					type: 'Community',
				}}
			/>

			<div className="mt-9">
				<Tabs defaultValue="threads" className="w-full">
					<TabsList className="tab">
						{communityTabs.map((tab) => (
							<TabsTrigger
								key={tab.label}
								value={tab.value}
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

								{tab.label === 'Threads' && (
									<p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
										{community.threads.length ?? 0}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent
						value="threads"
						className="w-full text-light-1"
					>
						<ThreadsTab
							currentUserId={clerkUser.id}
							accountId={community.id}
							accountType="Community"
						/>
					</TabsContent>

					<TabsContent
						value="members"
						className="w-full text-light-1"
					>
						<section className="mt-9 flex-col gap-10">
							{community.members.map((member) => (
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
					</TabsContent>

					<TabsContent
						value="requests"
						className="w-full text-light-1"
					>
						<ThreadsTab
							currentUserId={clerkUser.id}
							accountId={community.id}
							accountType="Community"
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default CommunityPage;
