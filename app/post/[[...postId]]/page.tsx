// type Props = {
//   params: Promise<{
//     slug?: string[];
//   }>;
// };

// export default async function postPage({ params }: Props) {
//   const { slug } = await params;

//   if (!slug) {
//     return <h1>Welcome to the Blog</h1>;
//   }

//   return (
//     <div>
//       <h1>post Page</h1>
//       <p>Slug: {slug.join(" / ")}</p>
//     </div>
//   );
// }

"use client";

import { usePathname } from "next/navigation";

export default function PostPage() {
  const pathname = usePathname();

  return (
    <div>
      <h1>Post Page</h1>
      <p>URL: {pathname}</p>
    </div>
  );
}