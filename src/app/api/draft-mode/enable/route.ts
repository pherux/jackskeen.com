import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { NextResponse, type NextRequest } from "next/server";

import { isSanityConfigured } from "../../../../../sanity/lib/env";
import { client } from "@/lib/sanity/client";

export const runtime = "nodejs";

const token = process.env.SANITY_API_READ_TOKEN;
const draftHandler = token
  ? defineEnableDraftMode({ client: client.withConfig({ token }) })
  : null;

export async function GET(request: NextRequest) {
  if (!isSanityConfigured || !draftHandler) {
    return NextResponse.json(
      {
        error: "Sanity project configuration and a Viewer token are required.",
      },
      { status: 503 },
    );
  }
  return draftHandler.GET(request);
}
