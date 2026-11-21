import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Product, IProduct } from "@/models/Product";
import Container from "@/components/layout/Container";
import ProductCard from "@/components/products/ProductCard";

const categories = ["All", "Newborn", "Clothing", "Toys", "Feeding", "Skincare"];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (category && category !== "All") {
    filter.category = category;
  }
  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }

  const rawProducts = await Product.find(filter).sort({ createdAt: -1 }).lean();
  const products: IProduct[] = JSON.parse(JSON.stringify(rawProducts));

  return (
    <Container className="py-6 xs:py-8 md:py-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-brand-text">
            {category && category !== "All" ? `${category} Collection` : "All Baby Products"}
          </h1>
          <p className="text-xs xs:text-sm text-brand-subtext mt-1">
            Showing {products.length} gentle & certified items
          </p>
        </div>

        {/* Search Form */}
        <form action="/products" method="GET" className="flex gap-2 w-full md:w-80">
          {category && <input type="hidden" name="category" value={category} />}
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Search baby items..."
            className="w-full px-3.5 py-2 text-sm bg-brand-surface border border-brand-border rounded-xl focus:outline-none focus:border-brand-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-medium rounded-xl transition cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category Pills (Horizontal scroll on Mobile Small & Large) */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
        {categories.map((cat) => {
          const active = (!category && cat === "All") || category === cat;
          return (
            <Link
              key={cat}
              href={cat === "All" ? "/products" : `/products?category=${cat}`}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs xs:text-sm font-medium border transition ${
                active
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-brand-surface text-brand-text border-brand-border hover:bg-brand-muted"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Responsive Grid: 1 col (Mobile Small) -> 2 (Mobile Large) -> 3 (Tablet) -> 4 (Laptop) -> 5 (Desktop) */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-brand-surface rounded-2xl border border-brand-border mt-4">
          <p className="text-brand-text font-semibold">No products found in database.</p>
          <p className="text-xs xs:text-sm text-brand-subtext mt-1">
            Add products from <Link href="/admin/products" className="text-brand-primary underline">/admin/products</Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 lg:gap-5 mt-2">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}