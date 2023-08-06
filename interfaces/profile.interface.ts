// INTERFACES
import { UserInterface } from './user.interface';
import { ThreadInterface } from './thread.interface';

export interface ProfileInterface {
	profile: UserInterface;
	threads: ThreadInterface[];
}
