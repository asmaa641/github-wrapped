import { NextResponse } from "next/server";

export async function GET(){
    const githubAuthURL = "https://github.com/login/oauth/authorize" +
    "?client_id=" 
    + process.env.GITHUB_CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(
      "http://localhost:3000/api/auth/callback"
      
    )
    +
    "&scope=read:user";
    return NextResponse.redirect(githubAuthURL);
    
}