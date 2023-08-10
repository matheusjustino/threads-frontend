// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { CommunityInterface } from '../../interfaces/community.interface';

export const removeUserFromCommunity = async (
	communityId: string,
	userId: string,
) => {
	return api
		.put<CommunityInterface>(`/communities/${communityId}/remove/member`, {
			userId,
		})
		.then((res) => res.data)
		.catch((err) => console.error(err));
};
