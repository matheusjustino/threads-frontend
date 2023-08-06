// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

export const getThread = async (threadId: string) => {
	return api
		.get<ThreadInterface>(`/threads/${threadId}`)
		.then((res) => res.data);
};
