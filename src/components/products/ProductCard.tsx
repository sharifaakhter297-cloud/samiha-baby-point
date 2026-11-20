import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/models/Product";

export default function ProductCard({ product }: { product: IProduct }) {
  const finalPrice = product.discountPrice ?? product.price;

  return (
    <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-brand-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2.5 left-2.5 bg-white/90 text-brand-secondary text-[10px] xs:text-xs font-semibold px-2 py-0.5 rounded-full">
            {product.ageGroup}
          </span>
        </Link>

        {/* Details */}
        <div className="p-3 xs:p-3.5 md:p-4">
          <p className="text-[11px] font-medium text-brand-subtext uppercase tracking-wider">
            {product.category}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-1 font-semibold text-sm xs:text-[15px] text-brand-text line-clamp-2 group-hover:text-brand-primary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="px-3 pb-3 xs:px-3.5 xs:pb-3.5 md:px-4 md:pb-4 pt-1 flex items-center justify-between gap-2">
        <div>
          <span className="font-bold text-sm xs:text-base text-brand-primary">
            ৳{finalPrice}
          </span>
          {product.discountPrice && (
            <span className="ml-1.5 text-xs text-brand-subtext line-through">
              ৳{product.price}
            </span>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-medium px-2.5 xs:px-3 py-2 rounded-xl transition cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Add</span>
        </button>
      </div>
    </div>
  );
}