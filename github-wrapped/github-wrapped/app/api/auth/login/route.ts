import { NextResponse } from "next/server";

export async function GET(){
    const githubAuthURL = "https://github.com/login/oauth/authorize" +
    "?client_id=" 
    + process.env.GITHUB_CLIENT_ID 
    +
    "&scope=read:user";
    return NextResponse.redirect(githubAuthURL);
}