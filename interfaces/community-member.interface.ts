// INTERFACES
import { UserInterface } from './user.interface';
import { CommunityInterface } from './community.interface';

export interface CommunityMemberInterface {
	id: string;
	communityId: string;
	community: CommunityInterface;
	memberId: string;
	member: UserInterface;
	createdAt: string;
	updatedAt: string;
}
