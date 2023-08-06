// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { UserInterface } from '../../interfaces/user.interface';

interface Params {
	userId?: string;
	searchTerm?: string;
	skip: string;
	take: string;
}

export const listUsers = async ({
	userId = '',
	searchTerm = '',
	skip = '0',
	take = '10',
}: Params) => {
	const searchParams = new URLSearchParams({
		userId,
		searchTerm,
		skip,
		take,
	});
	return api
		.get<UserInterface[]>(`/users?${searchParams}`)
		.then((res) => res.data);
};
