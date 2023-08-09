import { AxiosRequestConfig } from 'axios';

// LIBS
import { api } from '../../lib/axios';

// CONSTANTS
import { PROFILE_TABS } from '../../constants';

// INTERFACES
import { UserProfileInterface } from '../../interfaces/user-profile.interface';

export const getUserProfile = async (
	userId: string,
	profileTab: PROFILE_TABS = 'Threads',
) => {
	const config: AxiosRequestConfig = {
		params: {
			profileTab: profileTab.toUpperCase(),
		},
	};
	return api
		.get<UserProfileInterface>(`/users/${userId}/profile`, config)
		.then((res) => res.data)
		.catch((error) => {
			console.error(error);
			return null;
		});
};
