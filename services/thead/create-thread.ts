// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

interface Params {
	text: string;
	authorId: string;
	communityId: string | null;
}

export const createThread = async (data: Params) => {
	return await api
		.post<ThreadInterface>(`/threads`, data)
		.then((res) => res.data);
};
