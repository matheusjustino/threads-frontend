import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

// SERVICES
import { getUser } from '../../../../services/user/get-user';
import { getThread } from '../../../../services/thead/get-thread';

// COMPONENTS
import { ThreadCard } from '../../../../components/cards/thread-card';
import { Comment } from '../../../../components/forms/comment';

interface ThreadPageProps {
	params: {
		id: string;
	};
}

const ThreadPage: NextPage<ThreadPageProps> = async ({ params: { id } }) => {
	if (!id) return null;

	const clerkUser = await currentUser();
	if (!clerkUser) {
		redirect(`/sign-in`);
	}

	const userInfo = await getUser(clerkUser.id);
	if (!userInfo?.onboarded) {
		redirect(`/onboarding`);
	}

	const thread = await getThread(id);

	return (
		<section className="relative">
			<div>
				<ThreadCard
					thread={{
						...thread,
						currentUser: clerkUser.id,
					}}
				/>
			</div>

			<div className="mt-7">
				<Comment
					threadId={thread.id}
					currentUserImg={userInfo.profilePhoto}
					currentUserId={userInfo.id}
				/>
			</div>

			<div className="flex flex-col gap-3 mt-10">
				{thread.comments.map((comment) => {
					return (
						<ThreadCard
							key={comment.id}
							thread={{
								...comment,
								currentUser: clerkUser.id,
							}}
							isComment
						/>
					);
				})}
			</div>
		</section>
	);
};

export default ThreadPage;
