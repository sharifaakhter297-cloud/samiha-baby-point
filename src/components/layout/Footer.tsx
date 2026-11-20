import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-12 lg:mt-20">
      <Container className="py-10 lg:py-14">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="xs:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg text-brand-text">
              Samiha <span className="text-brand-primary">Baby Point</span>
            </h3>
            <p className="mt-2.5 text-sm text-brand-subtext leading-relaxed">
              Safe, soft, and trusted baby essentials curated with love for newborns and toddlers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-brand-text mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-brand-subtext">
              <li><Link href="/products?category=Newborn" className="hover:text-brand-primary">Newborn Care</Link></li>
              <li><Link href="/products?category=Clothing" className="hover:text-brand-primary">Baby Clothing</Link></li>
              <li><Link href="/products?category=Feeding" className="hover:text-brand-primary">Feeding & Bottles</Link></li>
              <li><Link href="/products?category=Skincare" className="hover:text-brand-primary">Baby Skincare</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-brand-text mb-3">Customer Care</h4>
            <ul className="space-y-2 text-sm text-brand-subtext">
              <li><Link href="/products" className="hover:text-brand-primary">Track Order</Link></li>
              <li><Link href="/products" className="hover:text-brand-primary">Return Policy</Link></li>
              <li><Link href="/products" className="hover:text-brand-primary">Delivery Info</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-brand-text mb-3">Contact Us</h4>
            <p className="text-sm text-brand-subtext">Dhaka, Bangladesh</p>
            <p className="text-sm text-brand-subtext mt-1">Support: 09:00 AM – 10:00 PM</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border text-center text-xs text-brand-subtext">
          © {new Date().getFullYear()} Samiha Baby Point. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}