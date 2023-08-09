import { AxiosRequestConfig } from 'axios';

// LIBS
import { api } from '../../lib/axios';

// CONSTANTS
import { COMMUNITY_TABS } from '../../constants';

// INTERFACES
import { CommunityProfileInterface } from '../../interfaces/community-profile.interface';

export const getCommunityProfile = async (
	id: string,
	profileTab: COMMUNITY_TABS = 'Threads',
) => {
	const config: AxiosRequestConfig = {
		params: {
			profileTab: profileTab.toUpperCase(),
		},
	};
	return api
		.get<CommunityProfileInterface>(`/communities/${id}/profile`, config)
		.then((res) => res.data);
};
