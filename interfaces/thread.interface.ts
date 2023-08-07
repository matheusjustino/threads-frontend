// INTERFACES
import { UserInterface } from './user.interface';
import { CommunityInterface } from './community.interface';

export interface ThreadInterface {
	id: string;
	text: string;
	authorId: string;
	author: UserInterface;
	parentThreadId?: string;
	comments: ThreadInterface[];
	communityId?: string;
	community?: CommunityInterface;
	createdAt: string;
	updatedAt: string;
}
