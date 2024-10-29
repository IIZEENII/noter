import type { Actions } from "@sveltejs/kit";

export const actions = {
  notes: async ({ request }) => {
    const data = await request.formData();
    const title = data.get('title');
    const content = data.get('content');
    return { title, content };
  },
} satisfies Actions;