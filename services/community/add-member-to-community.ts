// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { CommunityInterface } from '../../interfaces/community.interface';

export const addMemberToCommunity = async (
	communityId: string,
	userId: string,
) => {
	return api
		.put<CommunityInterface>(`/${communityId}/add/member`, { userId })
		.then((res) => res.data)
		.catch((err) => console.error(err));
};
