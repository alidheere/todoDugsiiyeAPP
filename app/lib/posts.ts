
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  ogImage: string;
};

export const posts: Post[] = [
  {
    slug: "healthy-foods",
    title: "10 Healthy Foods",
    excerpt: "Learn about 10 healthy foods for your body.",
    content: "Eating healthy foods helps support your overall health.",
    ogImage: "https://placehold.co/1200x630/png",
  },
  {
    slug: "daily-exercise",
    title: "Benefits of Daily Exercise",
    excerpt: "Discover the benefits of exercising every day.",
    content: "Daily exercise can improve fitness and overall well-being.",
    ogImage: "https://placehold.co/1200x630/png",
  },
];

export async function fetchPostBySlug(
  slug: string
): Promise<Post | undefined> {
  return posts.find((post) => post.slug === slug);
}
