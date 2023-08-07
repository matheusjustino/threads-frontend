// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { UserProfileInterface } from '../../interfaces/user-profile.interface';

export const getUserProfile = async (userId: string) => {
	return api
		.get<UserProfileInterface>(`/threads/user/${userId}`)
		.then((res) => res.data)
		.catch((error) => {
			console.error(error);
			return null;
		});
};
