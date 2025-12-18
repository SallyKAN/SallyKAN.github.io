import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
        layout: z.string().optional(), // Legacy Jekyll field
        categories: z.string().optional(), // Legacy Jekyll field
	}),
});

export const collections = { blog };
