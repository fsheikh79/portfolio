"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useMounted } from "@/hooks/use-mounted";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SceneErrorBoundary } from "./scene-error-boundary";

const Scene = dynamic(
  () => import("./scene").then((m) => ({ default: m.Scene })),
  {
    ssr: false,
    loading: () => null,
  },
);

export function SceneBackground() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 900px)");

  if (!mounted || reduced || !isDesktop) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.9),transparent_75%)]"
    >
      <SceneErrorBoundary>
        <Scene />
      </SceneErrorBoundary>
    </div>
  );
}
