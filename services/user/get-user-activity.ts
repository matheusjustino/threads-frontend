// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

export const getUserActivity = async (userId: string) => {
	return api
		.get<ThreadInterface[]>(`/users/${userId}/activity`)
		.then((res) => res.data);
};
