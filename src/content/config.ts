import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional()
	}),
});

const project = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        heroImage: z.string(),
        coverImage: z.string(),
		// Transform string to Date object
        releaseDate: z.coerce.date().optional(),
        trailer: z.string().optional(),
        tags: z.array(z.string()).optional(),
        platforms: z.array(z.string()).optional()
    }),
});

export const collections = { blog, project };
