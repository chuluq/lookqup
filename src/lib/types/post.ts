export type PostMetadata = {
	title: string;
	date: string;
	description: string;
	tags: string[];
	draft: boolean;
};

export type Post = PostMetadata & {
	slug: string;
};
