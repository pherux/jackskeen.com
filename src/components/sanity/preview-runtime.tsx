import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { isSanityConfigured } from "../../../sanity/lib/env";
import { SanityLive } from "@/lib/sanity/live";

export async function SanityPreviewRuntime() {
  if (!isSanityConfigured) return null;
  const { isEnabled } = await draftMode();
  return (
    <>
      {isEnabled ? <VisualEditing /> : null}
      <SanityLive />
    </>
  );
}
