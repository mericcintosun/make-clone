"use client";

import { useState } from "react";
import clsx from "clsx";

/**
 * A vertical tab navigation for department-based feature pages.
 *
 * @example
 * ```jsx
 * <DepartmentalNav onChange={console.log} />
 * ```
 */
export default function DepartmentalNav({
  items = [
    "IT",
    "Operations",
    "Marketing",
    "Sales",
    "Finance",
    "Customer Experience",
    "People",
  ],
  onChange,
}) {
  const [active, setActive] = useState(items[0]);

  const handleSelect = (label) => {
    setActive(label);
    onChange?.(label);
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto pt-12"
      style={{ backgroundColor: "#f5f0f0" }}
    >
      {/* Header Section */}
      <div className="text-center mb-12 w-[90%] mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
          Accelerate innovation across your business
        </h2>
        <p className="text-md text-slate-600 max-w-3xl mx-auto">
          Make drives efficiencies, solves problems and speeds innovation by
          breaking down silos across your business
        </p>
      </div>

      {/* Navigation */}
      <nav
        role="tablist"
        aria-label="Departments"
        className="w-full max-w-md mx-auto select-none"
      >
        <ul className="space-y-3">
          {items.map((label) => {
            const isActive = active === label;
            return (
              <li key={label} className="relative">
                <button
                  role="tab"
                  aria-selected={isActive}
                  className={clsx(
                    "w-full text-center font-semibold tracking-tight py-2 focus:outline-none transition-colors duration-150",
                    isActive
                      ? "text-fuchsia-600"
                      : "text-zinc-900 hover:text-fuchsia-600"
                  )}
                  onClick={() => handleSelect(label)}
                >
                  {label}
                </button>

                {/* underline */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    "absolute inset-x-0 bottom-0 h-1 transition-colors duration-150",
                    isActive ? "bg-fuchsia-600" : "bg-zinc-200"
                  )}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
