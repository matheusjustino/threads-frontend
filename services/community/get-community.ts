// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { CommunityInterface } from '../../interfaces/community.interface';

export const getCommunity = async (id: string) => {
	return api
		.get<CommunityInterface>(`/communities/${id}`)
		.then((res) => res.data);
};
