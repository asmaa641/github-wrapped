import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", req.url));
  }

 

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    return NextResponse.redirect(new URL("/?error=oauth_failed", req.url));
  }

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      "User-Agent": "GH Wrapped",
    },
  });

  if (!userResponse.ok) {
    return NextResponse.redirect(new URL("/?error=user_fetch_failed", req.url));
  }
  
const cookieStore = await cookies();
  cookieStore.set("github_token", tokenData.access_token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});

  const userData = await userResponse.json();

  return NextResponse.redirect(
    new URL(`/wrapped?user=${userData.login}`, req.url)
  );
}
