import { NextPage } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

// CONSTANTS
import { profileTabs } from '../../../../constants';

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

const ProfilePage: NextPage<ProfilePageProps> = async ({ params: { id } }) => {
	const clerkUser = await currentUser();
	if (!clerkUser) {
		return null;
	}

	const result = await getUserProfile(id);
	if (!result?.profile.onboarded) {
		redirect('/onboarding');
		return null;
	}
	const { profile, threads } = result;

	return (
		<section>
			<ProfileHeader
				profileInfo={{
					accountId: id,
					authUserId: clerkUser.id,
					name: profile.name,
					username: profile.username,
					imgUrl: profile.profilePhoto,
					bio: profile.bio,
				}}
			/>

			<div className="mt-9">
				<Tabs defaultValue="threads" className="w-full">
					<TabsList className="tab">
						{profileTabs.map((tab) => (
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
								currentUserId={clerkUser.id}
								accountId={profile.id}
								accountType="User"
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
};

export default ProfilePage;
