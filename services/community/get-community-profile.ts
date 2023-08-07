// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { CommunityProfileInterface } from '../../interfaces/community-profile.interface';

export const getCommunityProfile = async (id: string) => {
	return api
		.get<CommunityProfileInterface>(`/threads/community/${id}`)
		.then((res) => res.data);
};
