import { redirect } from 'next/navigation';
import { ThreadInterface } from '../../interfaces/thread.interface';
import { ThreadCard } from '../cards/thread-card';
import { getProfile } from '../../services/profile/get-profile';

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
	const { profile, threads: profileThreads } = await getProfile(accountId);

	if (!profileThreads?.length) {
		redirect('/');
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
