import Link from 'next/link';
import Image from 'next/image';

// UTILS
import { formatDateString } from '../../lib/utils';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

interface ThreadCardProps {
	thread: ThreadInterface;
	currentUserId?: string;
	isComment?: boolean;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
	thread,
	currentUserId,
	isComment,
}) => {
	return (
		<Link href={`/thread/${thread.id}`}>
			<article
				className={`flex w-full flex-col rounded-xl ${
					isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'
				}`}
			>
				<div className="flex items-start justify-between">
					<div className="flex w-full flex-1 gap-4">
						<div className="flex flex-col items-center">
							<Link
								href={`/profile/${thread.author.id}`}
								className="relative h-11 w-11"
							>
								<Image
									src={thread.author.profilePhoto}
									alt="Profile image"
									fill
									priority
									className="cursor-pointer rounded-full"
								/>
							</Link>

							<div className="thread-card_bar" />
						</div>

						<div>
							<Link
								href={`/profile/${thread.author.id}`}
								className="w-fit"
							>
								<h4 className="cursor-pointer text-base-semibold text-light-1">
									{thread.author.name}
								</h4>
							</Link>

							<p className="mt-2 text-small-regular text-light-2">
								{thread.text}
							</p>

							<div className={`mt-5 flex flex-col gap-3`}>
								<div className="flex gap-3.5">
									<Image
										src="/assets/heart-gray.svg"
										alt="Heart"
										width={24}
										height={24}
										priority
										className="cursor-pointer object-contain"
									/>

									<Link href={`/thread/${thread.id}`}>
										<Image
											src="/assets/reply.svg"
											alt="Reply"
											width={24}
											height={24}
											priority
											className="cursor-pointer object-contain"
										/>
									</Link>

									<Image
										src="/assets/repost.svg"
										alt="Repost"
										width={24}
										height={24}
										priority
										className="cursor-pointer object-contain"
									/>

									<Image
										src="/assets/share.svg"
										alt="share"
										width={24}
										height={24}
										priority
										className="cursor-pointer object-contain"
									/>
								</div>

								{isComment &&
									thread.comments &&
									thread.comments?.length > 0 && (
										<Link href={`/thread/${thread.id}`}>
											<p className="mt-1 text-subtle-medium text-gray-1">
												{thread.comments?.length ?? 0}{' '}
												replies
											</p>
										</Link>
									)}
							</div>
						</div>
					</div>

					{/** TODO: Delete Thread */}

					{/** TODO: Show comments logos */}
				</div>

				{!isComment && thread.community && (
					<Link
						href={`/communities/${thread.community.id}`}
						className="mt-5 flex items-center"
					>
						<p className="text-subtle-medium text-gray-1 hover:text-primary-500">
							{formatDateString(thread.createdAt)} -{' '}
							{thread.community.name} Community
						</p>

						<Image
							src={thread.community.image}
							alt={thread.community.name}
							priority
							width={24}
							height={24}
							className="ml-1 rounded-full"
						/>
					</Link>
				)}
			</article>
		</Link>
	);
};

export { ThreadCard };
