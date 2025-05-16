"use client";

import React, { ReactNode, forwardRef } from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { useScrollAnimation, fadeIn } from "@/hooks/use-scroll-animation";

interface ScrollableSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  speed?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  threshold?: number;
  dataScrollSection?: boolean;
  dataScrollSpeed?: number;
  dataScrollDirection?: "vertical" | "horizontal";
}

const ScrollableSection = forwardRef<HTMLElement, ScrollableSectionProps>(
  (
    {
      children,
      className = "",
      variants = fadeIn,
      speed = 0,
      delay = 0,
      direction = "up",
      once = true,
      threshold = 0.1,
      dataScrollSection = true,
      dataScrollSpeed,
      dataScrollDirection,
      ...props
    },
    ref
  ) => {
    const scrollProps = useScrollAnimation({ once, threshold });
    
    // Create animation variants based on direction
    const getDirectionVariants = (): Variants => {
      switch (direction) {
        case "up":
          return {
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay,
              },
            },
          };
        case "down":
          return {
            hidden: { opacity: 0, y: -50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay,
              },
            },
          };
        case "left":
          return {
            hidden: { opacity: 0, x: 50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay,
              },
            },
          };
        case "right":
          return {
            hidden: { opacity: 0, x: -50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay,
              },
            },
          };
        case "none":
          return {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay,
              },
            },
          };
        default:
          return variants;
      }
    };

    const activeVariants = direction !== "none" ? getDirectionVariants() : variants;

    return (
      <motion.section
        ref={ref || scrollProps.ref}
        className={className}
        initial="hidden"
        animate={scrollProps.controls}
        variants={activeVariants}
        data-scroll-section={dataScrollSection ? "" : undefined}
        data-scroll-speed={dataScrollSpeed}
        data-scroll-direction={dataScrollDirection}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

ScrollableSection.displayName = "ScrollableSection";

export default ScrollableSection; 