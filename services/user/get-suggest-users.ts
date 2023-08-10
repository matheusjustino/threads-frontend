import { AxiosRequestConfig } from 'axios';

// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { UserInterface } from '../../interfaces/user.interface';

export const getSuggestUsers = async (count?: number) => {
	const config: AxiosRequestConfig = {
		params: {
			...(count !== undefined && { count }),
		},
	};
	return api
		.get<UserInterface[]>(`/users/suggest`, config)
		.then((res) => res.data);
};
