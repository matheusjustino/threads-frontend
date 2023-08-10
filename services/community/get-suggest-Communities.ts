import { AxiosRequestConfig } from 'axios';

// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { CommunityInterface } from '../../interfaces/community.interface';

export const getSuggestCommunities = async (count?: number) => {
	const config: AxiosRequestConfig = {
		params: {
			...(count !== undefined && { count }),
		},
	};
	return api
		.get<CommunityInterface[]>(`/communities/suggest`, config)
		.then((res) => res.data);
};
