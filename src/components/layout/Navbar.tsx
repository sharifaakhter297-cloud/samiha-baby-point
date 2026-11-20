"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Search, Baby } from "lucide-react";
import Container from "./Container";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Newborn", href: "/products?category=Newborn" },
  { name: "Clothing", href: "/products?category=Clothing" },
  { name: "Feeding", href: "/products?category=Feeding" },
  { name: "Toys", href: "/products?category=Toys" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-surface/95 backdrop-blur border-b border-brand-border">
      {/* Top Announcement Bar */}
      <div className="bg-brand-secondary text-white text-[11px] xs:text-xs text-center py-1.5 px-2">
        Free Delivery on Baby Essentials Orders Over ৳1,500
      </div>

      <Container>
        <div className="flex items-center justify-between h-14 xs:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-xl bg-brand-muted flex items-center justify-center text-brand-primary">
              <Baby className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="block font-bold text-sm xs:text-base lg:text-xl text-brand-text tracking-tight">
                Samiha <span className="text-brand-primary">Baby Point</span>
              </span>
              <span className="hidden sm:block text-[11px] text-brand-subtext">
                Gentle Care for Little Ones
              </span>
            </div>
          </Link>

          {/* Laptop & Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 xs:gap-3">
            <Link
              href="/products"
              aria-label="Search"
              className="p-2 rounded-full hover:bg-brand-muted text-brand-text transition"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 bg-brand-muted hover:bg-brand-primary hover:text-white text-brand-primary px-2.5 xs:px-3.5 py-2 rounded-full text-xs xs:text-sm font-semibold transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Cart</span>
              <span className="bg-brand-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Mobile & Tablet Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-brand-text hover:bg-brand-muted"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Small, Mobile Large & Tablet Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-brand-surface border-t border-brand-border px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-medium text-brand-text hover:bg-brand-muted hover:text-brand-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}