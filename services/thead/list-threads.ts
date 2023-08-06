// LIBS
import { api } from '../../lib/axios';

// INTERFACES
import { ThreadInterface } from '../../interfaces/thread.interface';

interface Params {
	skip: string;
	take: string;
}

export const listThreads = async ({ skip = '0', take = '10' }: Params) => {
	const searchParams = new URLSearchParams({ skip, take });
	return api
		.get<ThreadInterface[]>(`/threads?${searchParams}`)
		.then((res) => res.data);
};
