/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ShieldCheck, Truck, HeartHandshake, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import ProductCard from "@/components/products/ProductCard";
import { IProduct, Product } from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<IProduct[]> {
  try {
    await connectDB();
    const docs = await Product.find({ isFeatured: true })
      .limit(10)
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(docs));
  } catch (error) {
    console.error("Failed to load featured products:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-muted border-b border-brand-border">
        <Container className="py-8 xs:py-10 md:py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 xs:space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-white text-brand-primary text-xs font-semibold px-3 py-1 rounded-full border border-brand-border">
                <Sparkles className="w-3.5 h-3.5" />
                100% Baby-Safe & Certified Products
              </span>

              <h1 className="text-2xl xs:text-3xl md:text-4xl xl:text-5xl font-bold text-brand-text leading-tight">
                Softest Care & Comfort for Your{" "}
                <span className="text-brand-primary">Little Sunshine</span>
              </h1>

              <p className="text-sm xs:text-base text-brand-subtext max-w-xl mx-auto lg:mx-0">
                Explore organic baby clothing, newborn essentials, BPA-free feeding gear, and gentle skincare at Samiha Baby Point.
              </p>

              <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="/products"
                  className="w-full xs:w-auto text-center bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-xl transition"
                >
                  Shop Baby Essentials
                </Link>
                <Link
                  href="/products?category=Newborn"
                  className="w-full xs:w-auto text-center bg-white hover:bg-brand-muted text-brand-text font-semibold text-sm px-6 py-3 rounded-xl border border-brand-border transition"
                >
                  Newborn Collection
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=80"
                  alt="Samiha Baby Point Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-brand-border bg-brand-surface">
        <Container className="py-5">
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 text-center xs:text-left">
            <div className="flex items-center justify-center xs:justify-start gap-3">
              <ShieldCheck className="w-6 h-6 text-brand-secondary shrink-0" />
              <div>
                <p className="text-xs xs:text-sm font-semibold text-brand-text">Skin-Safe Fabrics</p>
                <p className="text-[11px] text-brand-subtext">Tested & chemical-free</p>
              </div>
            </div>
            <div className="flex items-center justify-center xs:justify-start gap-3">
              <Truck className="w-6 h-6 text-brand-primary shrink-0" />
              <div>
                <p className="text-xs xs:text-sm font-semibold text-brand-text">Fast Home Delivery</p>
                <p className="text-[11px] text-brand-subtext">All over Bangladesh</p>
              </div>
            </div>
            <div className="flex items-center justify-center xs:justify-start gap-3">
              <HeartHandshake className="w-6 h-6 text-brand-secondary shrink-0" />
              <div>
                <p className="text-xs xs:text-sm font-semibold text-brand-text">Easy Exchange</p>
                <p className="text-[11px] text-brand-subtext">7-day size replacement</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Grid: 1 col (Mobile Small) -> 2 cols (Mobile Large) -> 3 cols (Tablet) -> 4 cols (Laptop) -> 5 cols (Desktop) */}
      <section>
        <Container className="py-8 md:py-12 lg:py-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-lg xs:text-xl md:text-2xl font-bold text-brand-text">
                Featured Baby Products
              </h2>
              <p className="text-xs xs:text-sm text-brand-subtext mt-0.5">
                Handpicked favorites loved by parents
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs xs:text-sm font-semibold text-brand-primary hover:underline"
            >
              View All →
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-12 bg-brand-surface border border-brand-border rounded-2xl px-4">
              <p className="text-sm font-semibold text-brand-text">
                No featured products in MongoDB yet.
              </p>
              <p className="text-xs text-brand-subtext mt-1">
                Add your first baby product from the admin panel to display it here.
              </p>
              <Link
                href="/admin/products"
                className="mt-4 inline-block bg-brand-primary hover:bg-brand-primary-dark text-white text-xs xs:text-sm font-semibold px-5 py-2.5 rounded-xl transition"
              >
                + Add Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 lg:gap-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}