"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { floatVariants } from "../lib/motion";

interface FloatingGlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingGlassCard({
  children,
  className,
  delay = 0,
}: FloatingGlassCardProps) {
  return (
    <motion.div
      variants={floatVariants}
      animate="animate"
      transition={{ delay }}
      className={cn(
        "glass rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
