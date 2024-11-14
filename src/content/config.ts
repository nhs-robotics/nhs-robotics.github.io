import { defineCollection, z, reference, getCollection } from "astro:content";

const tags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string()
  }),
});

const sponsors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    image: z.string(),
    website: z.string().url(),
    description: z.string()
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    hero: z.object({
      image: z.string(),
      alt: z.string(),
    }),
    tags: reference("tags").array(),
    hideElements: z.object({
      tableOfContents: z.boolean().default(false),
      recommended: z.boolean().default(false)
    }).default({
      tableOfContents: false,
      recommended: false
    })
  }),
});

const aboutUsSections = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    visual: z.object({
      image: z.string(),
      alt: z.string(),
    }),
  }),
});

export const collections = { posts, tags, sponsors, aboutUsSections };

export async function loadTagNames<T extends { id: string }>(
  tags: T[],
): Promise<(T & { name: string })[]> {
  const registeredTags = await getCollection("tags");
  let tagWithNames: (T & { name: string })[] = [];

  for (let tag of tags) {
    for (let registeredTag of registeredTags) {
      if (tag.id === registeredTag.id) {
        tagWithNames.push({
          ...tag,
          name: registeredTag.data.name,
        });

        break;
      }
    }
  }

  return tagWithNames;
}
