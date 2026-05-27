"use client";

import { useId } from "react";
import Link from "next/link";

interface BrandLogoProps {
  href?: string;
  showLabel?: boolean;
  className?: string;
  markClassName?: string;
  labelClassName?: string;
}

export function BrandLogo({
  href = "/",
  showLabel = true,
  className = "",
  markClassName = "",
  labelClassName = "",
}: BrandLogoProps) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`} aria-label="StackAudit">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_24px_rgba(34,211,238,0.25)] ${markClassName}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={`stackaudit-logo-gradient-${gradientId}`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cffafe" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="6" stroke={`url(#stackaudit-logo-gradient-${gradientId})`} strokeWidth="1.5" />
          <path d="M7 8.5h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 12h7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 15.5h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14.5 8.5l2.5 2.5-2.5 2.5" stroke="#cffafe" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {showLabel ? (
        <span className={labelClassName || "text-xl font-bold tracking-tight gradient-text"}>StackAudit</span>
      ) : null}
    </Link>
  );
}