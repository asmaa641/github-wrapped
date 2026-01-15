import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("github_token");

  return NextResponse.redirect(new URL("/", "http://localhost:3000"));
}
