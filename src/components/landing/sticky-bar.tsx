"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ContractCopy } from "@/components/layout/footer";
import { SignInButton } from "@/components/auth/sign-in-button";

/** Bottom bar that appears once the hero has scrolled away and hides again near the footer. */
export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.body.scrollHeight - 420;
      setShow(y > window.innerHeight * 0.8 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-30 safe-bottom pointer-events-none"
        >
          <div className="mx-auto max-w-6xl px-3 sm:px-5 pb-3 sm:pb-4">
            <div className="pointer-events-auto liquid-glass rounded-full flex items-center justify-between gap-3 pl-4 sm:pl-5 pr-2 py-2 bg-[rgba(10,10,11,0.85)]">
              <div className="hidden sm:flex items-center gap-4 min-w-0">
                <span className="text-sm text-white truncate">Free, no account needed</span>
                <span className="h-4 w-px bg-white/10" aria-hidden />
                <ContractCopy />
              </div>
              <div className="sm:hidden">
                <ContractCopy />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden md:inline-flex">
                  <SignInButton size="sm" label="Sign in" />
                </span>
                <Link href="/calculator" className="btn-primary !py-2.5 !px-4 text-sm">
                  Open the calculator
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
