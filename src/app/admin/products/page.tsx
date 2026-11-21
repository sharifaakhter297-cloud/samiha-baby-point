"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

export default function AdminAddProductPage() {
  const [form, setForm] = useState({
    name: "",
    category: "Newborn",
    price: "",
    discountPrice: "",
    ageGroup: "0-6 Months",
    image: "",
    stock: "10",
    isFeatured: true,
    description: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving to MongoDB...");

    const slug =
      form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now().toString().slice(-4);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        stock: Number(form.stock),
      }),
    });

    if (res.ok) {
      setStatus("Product saved to MongoDB successfully!");
      setForm({
        name: "",
        category: "Newborn",
        price: "",
        discountPrice: "",
        ageGroup: "0-6 Months",
        image: "",
        stock: "10",
        isFeatured: true,
        description: "",
      });
    } else {
      setStatus("Failed to save product. Check MongoDB connection.");
    }
  };

  return (
    <Container className="py-6 xs:py-8 md:py-12 max-w-2xl">
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-4 xs:p-6 md:p-8 shadow-xs">
        <h1 className="text-xl xs:text-2xl font-bold text-brand-text">
          Add New Baby Product
        </h1>
        <p className="text-xs xs:text-sm text-brand-subtext mt-1">
          Save product directly to Samiha Baby Point MongoDB database
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-text mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Soft Cotton Baby Swaddle Blanket"
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl bg-white"
              >
                <option value="Newborn">Newborn</option>
                <option value="Clothing">Clothing</option>
                <option value="Toys">Toys</option>
                <option value="Feeding">Feeding</option>
                <option value="Skincare">Skincare</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">
                Age Group
              </label>
              <input
                type="text"
                required
                value={form.ageGroup}
                onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                placeholder="e.g. 0-12 Months"
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">
                Regular Price (৳)
              </label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">
                Discount Price (Optional)
              </label>
              <input
                type="number"
                value={form.discountPrice}
                onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-text mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-text mb-1">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write gentle fabric & safety details..."
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm py-3 rounded-xl transition cursor-pointer"
          >
            Save Product to MongoDB
          </button>

          {status && (
            <p className="text-center text-xs xs:text-sm font-medium text-brand-secondary pt-1">
              {status}
            </p>
          )}
        </form>
      </div>
    </Container>
  );
}