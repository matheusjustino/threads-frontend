// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { CommunityInterface } from '../../interfaces/community.interface';

interface Params {
	searchTerm?: string;
	skip: string;
	take: string;
}

export const listCommunities = async ({
	searchTerm = '',
	skip = '0',
	take = '10',
}: Params) => {
	const searchParams = new URLSearchParams({
		searchTerm,
		skip,
		take,
	});
	return api
		.get<CommunityInterface[]>(`/communities?${searchParams}`)
		.then((res) => res.data);
};
