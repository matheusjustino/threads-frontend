// INTERFACES
import { UserInterface } from './user.interface';

export interface ThreadInterface {
	id: string;
	text: string;
	authorId: string;
	author: UserInterface;
	parentThreadId?: string;
	comments: ThreadInterface[];
	communityId?: string;
	createdAt: string;
	updatedAt: string;
}
