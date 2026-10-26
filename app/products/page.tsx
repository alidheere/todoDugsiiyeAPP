import RevalidateButton from "./revalidate-button";

const ProductsPage = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products", {
      next: { tags: ["products"] },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const products = data.products?.slice(0, 5);

    if (!products || products.length === 0) {
      return <div>Products lama soo qaadi karo. Hubi API-ga.</div>;
    }

    return (
      <div>
        <h1>Products</h1>

        {products.map((product: {
          id: number;
          title: string;
          price: number;
          thumbnail: string;
        }) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>${product.price}</p>

            <img
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        ))}

        <RevalidateButton />
      </div>
    );
  } catch (error) {
    console.error("Products fetch error:", error);

    return <div>Products lama soo qaadi karo. Hubi API-ga.</div>;
  }
};

export default ProductsPage;