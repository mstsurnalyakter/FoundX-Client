import { NextResponse } from "next/server";
import { NextRequest } from "next/server";



const AuthRoute = ["/login", "/register"];
const roleBasedRoute = {
  USER: [/^\/proflie/],
  ADMIN: [/^\/admin/],
};

type Role = keyof typeof roleBasedRoute

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
    const user = {
      name: "Surnaly",
      token: "USERDDDDDDDDDDDD",
      role: "USER",
    };

//   const user = undefined;
  if (!user) {
    if (AuthRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user?.role && roleBasedRoute[user?.role as Role]) {
    const routes = roleBasedRoute[user?.role as Role]
    if (routes?.some((route)=>pathname.match(route))) {
        return NextResponse.next()
    }
    
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/profile", "/admin", "/login", "/register"],
};
