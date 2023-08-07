// INTERFACES
import { ThreadInterface } from './thread.interface';
import { CommunityInterface } from './community.interface';

export interface CommunityProfileInterface {
	profile: CommunityInterface;
	threads: ThreadInterface[];
}
