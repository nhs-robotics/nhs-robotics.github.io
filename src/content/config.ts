import { defineCollection, z, reference, getCollection } from 'astro:content';

const tags = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string()
	}),
});

const posts = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date(),
		hero: z.object({
			image: z.string(),
			alt: z.string()
		}),
		tags: reference('tags').array()
	}),
});

export const collections = { posts, tags };

export async function loadTagNames<T extends { id: string }>(tags: T[]): Promise<(T & { name: string })[]> {
	const registeredTags = await getCollection('tags');
	let tagWithNames: (T & { name: string })[] = [];

	for (let tag of tags) {
		for (let registeredTag of registeredTags) {
			if (tag.id === registeredTag.id) {
				tagWithNames.push({
					...tag,
					name: registeredTag.data.name
				});

				break;
			}
		}
	}

	return tagWithNames;
}