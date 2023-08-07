// INTERFACES
import { UserInterface } from './user.interface';
import { ThreadInterface } from './thread.interface';

export interface UserProfileInterface {
	profile: UserInterface;
	threads: ThreadInterface[];
}
