import { redirect } from 'next/navigation';

// SERVICES
import { getProfile } from '../../services/profile/get-profile';

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
	const result = await getProfile(accountId);
	if (!result?.profile.onboarded) {
		redirect('/onboarding');
		return null;
	}

	const { profile, threads: profileThreads } = result;

	if (!profileThreads?.length) {
		redirect('/');
		return null;
	}

	return (
		<section className="mt-9 flex flex-col gap-10">
			{profileThreads.map((thread) => (
				<ThreadCard
					key={thread.id}
					thread={{
						id: thread.id,
						currentUser: currentUserId,
						parentId: thread.parentThreadId,
						text: thread.text,
						author:
							accountType === 'User' ? profile : thread.author,
						comments: thread.comments,
						createdAt: thread.createdAt,
					}}
				/>
			))}
		</section>
	);
};

export { ThreadsTab };
