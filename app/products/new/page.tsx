'use client';

import { createProduct } from "../../actions/create-products";



export default function NewProductPage() {
  return (
    <form action={createProduct}>
      <input name="title" placeholder="Product name" />
      <button type="submit" className="bg-blue-500 rounded-2xl">Add</button>
    </form>
  );
}
