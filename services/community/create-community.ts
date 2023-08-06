// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { CommunityInterface } from '../../interfaces/community.interface';

interface Params {
	id: string;
	name: string;
	username: string;
	image: string;
	bio: string;
	createdById: string;
}

export const createCommunity = async (params: Params) => {
	return api
		.post<CommunityInterface>(`/communities`, params)
		.then((res) => res.data);
};
