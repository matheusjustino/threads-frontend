'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// COMPONENTS
import { Button } from '../ui/button';

// INTERFACES
import { UserInterface } from '../../interfaces/user.interface';

interface CommunityCardProps {
	id: string;
	name: string;
	username: string;
	imgUrl: string;
	members: UserInterface[];
}

const CommunityCard: React.FC<CommunityCardProps> = ({
	id,
	name,
	username,
	imgUrl,
	members,
}) => {
	const { push } = useRouter();

	return (
		<article className="user-card">
			<div className="user-card_avatar">
				<Image
					src={imgUrl}
					alt="Profile photo"
					width={48}
					height={48}
					className="rounded-full"
				/>

				<div className="flex-1 text-ellipsis">
					<h4 className="text-base-semibold text-light-1">{name}</h4>
					<p className="text-small-medium text-gray-1">@{username}</p>
				</div>
			</div>

			<Button
				className="user-card_btn"
				onClick={() => push(`/communities/${id}`)}
			>
				View
			</Button>
		</article>
	);
};

export { CommunityCard };
