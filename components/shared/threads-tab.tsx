import { redirect } from 'next/navigation';

// SERVICES
import { getUserProfile } from '../../services/profile/get-user-profile';
import { getCommunityProfile } from '../../services/community/get-community-profile';

// INTERFACES
import { CommunityInterface } from '../../interfaces/community.interface';

// COMPONENTS
import { ThreadCard } from '../cards/thread-card';

interface ThreadsTabProps {
	currentUserId: string;
	accountId: string;
	accountType: 'User' | 'Community';
}

const ThreadsTab: React.FC<ThreadsTabProps> = async ({
	currentUserId,
	accountId,
	accountType,
}) => {
	let result;

	if (accountType === 'User') {
		result = await getUserProfile(accountId);
	} else {
		result = await getCommunityProfile(accountId);
	}

	if (!result) {
		redirect('/');
		return null;
	}

	const { profile, threads } = result;
	const author = (profile as CommunityInterface)?.createdBy || profile;

	return (
		<section className="mt-9 flex flex-col gap-10">
			{threads.map((thread) => (
				<ThreadCard
					key={thread.id}
					thread={{
						id: thread.id,
						currentUser: currentUserId,
						parentId: thread.parentThreadId,
						text: thread.text,
						author: accountType === 'User' ? author : thread.author,
						comments: thread.comments,
						createdAt: thread.createdAt,
						community: thread.community,
					}}
				/>
			))}
		</section>
	);
};

export { ThreadsTab };
