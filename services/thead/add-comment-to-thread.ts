// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

interface Params {
	text: string;
	threadId: string;
	userId: string;
}

export const addCommentToThread = async (data: Params) => {
	return api
		.post<ThreadInterface>(`/threads/add/comment`, data)
		.then((res) => res.data);
};
