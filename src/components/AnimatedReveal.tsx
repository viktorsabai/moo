"use client";

import { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";
import { revealVariants } from "../lib/motion";

interface AnimatedRevealProps extends Omit<MotionProps, "children"> {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  duration?: number;
}

export function AnimatedReveal({
  children,
  variants = revealVariants,
  delay = 0,
  duration,
  ...props
}: AnimatedRevealProps) {
  const visibleVariant = variants.visible;
  const visibleTransition =
    typeof visibleVariant === "object" && "transition" in visibleVariant
      ? visibleVariant.transition
      : undefined;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={
        duration
          ? {
              ...visibleTransition,
              duration,
              delay,
            }
          : { delay, ...visibleTransition }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
