"use client";

import { createContext, useContext, useRef, useEffect, useState, ReactNode } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";

type LocomotiveScrollContextType = {
  scroll: LocomotiveScroll | null;
};

const LocomotiveScrollContext = createContext<LocomotiveScrollContextType>({
  scroll: null,
});

export const useLocomotiveScroll = () => useContext(LocomotiveScrollContext);

interface LocomotiveScrollProviderProps {
  children: ReactNode;
  options?: {
    smooth?: boolean;
    lerp?: number;
    multiplier?: number;
    smartphone?: {
      smooth?: boolean;
      lerp?: number;
    };
    tablet?: {
      smooth?: boolean;
      lerp?: number;
    };
  };
  watch?: any[];
  enabled?: boolean;
  location?: string[];
}

export function LocomotiveScrollProvider({
  children,
  options = {
    smooth: true,
    lerp: 0.08,
    multiplier: 1,
    smartphone: {
      smooth: true,
      lerp: 0.1,
    },
    tablet: {
      smooth: true,
      lerp: 0.09,
    },
  },
  watch = [],
  enabled = true,
  location = ["/", "/archive"],
}: LocomotiveScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const pathname = usePathname();
  const shouldEnableScroll = enabled && location.includes(pathname);

  useEffect(() => {
    if (!shouldEnableScroll || !containerRef.current) return;
    
    // Import dynamically to prevent SSR issues
    import("locomotive-scroll").then((LocomotiveScrollModule) => {
      const LocomotiveScroll = LocomotiveScrollModule.default;
      
      const instance = new LocomotiveScroll({
        el: containerRef.current!,
        ...options,
      });

      setScroll(instance);

      return () => {
        instance.destroy();
        setScroll(null);
      };
    });
  }, [shouldEnableScroll, pathname, options]);

  useEffect(() => {
    if (!scroll) return;

    // Update scroll on route change or watched props changes
    const onResize = () => scroll.update();
    
    // Update scroll when images and fonts load
    const onLoad = () => scroll.update();

    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);

    // Update the scroll when watch values change
    scroll.update();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
    };
  }, [scroll, watch, pathname]);

  return (
    <LocomotiveScrollContext.Provider value={{ scroll }}>
      <div 
        ref={containerRef} 
        data-scroll-container
        className={shouldEnableScroll ? "" : ""}
      >
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
} 