import { db } from '~/lib/db.server';

export const getPosts = async () => {
	const response = await db.post.findMany({});
	return response;
};

export const getPost = async (id: string) => {
	const response = await db.post.findUnique({
		where: {
			id,
		},
	});
	return response;
};
