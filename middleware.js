import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
  matcher: ["/"],
};

export function middleware(request = NextRequest) {
  let access = request.cookies.get("access");
  // console.log('token :-', token)
  if (access) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}
