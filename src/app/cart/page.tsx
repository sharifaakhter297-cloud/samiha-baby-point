"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, subtotal } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const deliveryCharge = subtotal >= 1500 || subtotal === 0 ? 0 : 80;
  const totalAmount = subtotal + deliveryCharge;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          city,
          items,
          totalAmount,
        }),
      });

      if (res.ok) {
        clearCart();
        setOrderSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <Container className="py-16 text-center max-w-lg">
        <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 xs:p-8 shadow-xs">
          <CheckCircle2 className="w-12 h-12 text-brand-secondary mx-auto" />
          <h1 className="mt-4 text-xl xs:text-2xl font-bold text-brand-text">
            Order Placed Successfully!
          </h1>
          <p className="mt-2 text-sm text-brand-subtext">
            Thank you for shopping with Samiha Baby Point. Our team will confirm your order shortly.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold px-6 py-3 rounded-xl transition"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6 xs:py-8 md:py-12">
      <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-brand-text mb-6">
        Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-10 text-center">
          <p className="text-brand-subtext text-sm">Your cart is currently empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block bg-brand-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
          >
            Browse Baby Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-brand-surface border border-brand-border rounded-2xl p-3 xs:p-4 flex items-center gap-3 xs:gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 xs:w-20 xs:h-20 rounded-xl object-cover bg-brand-muted shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm xs:text-base text-brand-text truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs xs:text-sm font-bold text-brand-primary mt-0.5">
                    ৳{item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg border border-brand-border flex items-center justify-center hover:bg-brand-muted cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs xs:text-sm font-semibold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg border border-brand-border flex items-center justify-center hover:bg-brand-muted cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  aria-label="Remove item"
                  className="p-2 text-brand-subtext hover:text-brand-primary cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handleCheckout}
            className="lg:col-span-5 bg-brand-surface border border-brand-border rounded-2xl p-4 xs:p-6 space-y-4"
          >
            <h2 className="font-bold text-base xs:text-lg text-brand-text">
              Delivery Details (Cash on Delivery)
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                required
                placeholder="Parent / Receiver Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl focus:outline-none focus:border-brand-primary"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number (e.g. 017XXXXXXXX)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl focus:outline-none focus:border-brand-primary"
              />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl bg-white focus:outline-none focus:border-brand-primary"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Other">Other District</option>
              </select>
              <textarea
                required
                rows={2}
                placeholder="Full Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div className="border-t border-brand-border pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-brand-subtext">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-brand-subtext">
                <span>Delivery</span>
                <span>{deliveryCharge === 0 ? "Free" : `৳${deliveryCharge}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-brand-text pt-1">
                <span>Total</span>
                <span className="text-brand-primary">৳{totalAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition cursor-pointer"
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </form>
        </div>
      )}
    </Container>
  );
}