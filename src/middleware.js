import { NextResponse } from 'next/server';

export function middleware(req) {
  const user = req.cookies.get('user');

  // منع الوصول إلى /dashboard إذا لم يكن المستخدم مسجلاً
  if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
