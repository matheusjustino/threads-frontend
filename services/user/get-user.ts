// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { UserInterface } from '../../interfaces/user.interface';

export const getUser = async (userId: string) => {
	return api.get<UserInterface>(`/users/${userId}`).then((res) => res.data);
};
