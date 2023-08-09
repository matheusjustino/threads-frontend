'use client';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

// COMPONENTS
import { ThreadCard } from '../cards/thread-card';

interface ThreadsTabProps {
	currentUserId: string;
	threads: ThreadInterface[];
}

const ThreadsTab: React.FC<ThreadsTabProps> = ({ currentUserId, threads }) => {
	return (
		<section className="mt-9 flex flex-col gap-10">
			{threads.map((thread) => (
				<ThreadCard
					key={thread.id}
					thread={thread}
					currentUserId={currentUserId}
				/>
			))}
		</section>
	);
};

export { ThreadsTab };
