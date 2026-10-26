'use server';

import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const title = formData.get('title');

  await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: { 'Content-Type': 'application/json' },
  });

  revalidatePath('/products');
}
