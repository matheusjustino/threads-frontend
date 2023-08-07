// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { ProfileInterface } from '../../interfaces/profile.interface';

export const getProfile = async (userId: string) => {
	return api
		.get<ProfileInterface>(`/threads/user/${userId}`)
		.then((res) => res.data)
		.catch((error) => console.error(error));
};
