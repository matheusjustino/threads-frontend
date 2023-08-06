// INTERFACES
import { UserInterface } from './user.interface';
import { ThreadInterface } from './thread.interface';

export interface CommunityInterface {
	id: string;
	name: string;
	username: string;
	bio: string;
	image: string;
	createdById: string;
	createdBy: UserInterface;
	members: UserInterface[];
	threads: ThreadInterface[];
	createdAt: string;
	updatedAt: string;
}
