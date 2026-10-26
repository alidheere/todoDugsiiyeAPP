import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const auth = request.cookies.get('auth')?.value;
  const role = request.cookies.get('role')?.value;

  // Protect /dashboard
  if (url.pathname.startsWith('/dashboard') && auth !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //   if (url.pathname.startsWith('/admin') && role !== 'admin') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // // if(request.nextUrl.pathname.startsWith('/post/')){
  // //   const slug= request.nextUrl.pathname.split('/')[2]
  // //   return NextResponse.redirect(new URL(`/blog/${slug}`, request.url))

  // // }

  // if (url.pathname.startsWith('/post/')) {
  //   const slug = url.pathname.split('/')[2];
  //   return NextResponse.redirect(new URL(`/blog/${slug}`, request.url));
  // }
  return NextResponse.next(); // let the request continue
}
