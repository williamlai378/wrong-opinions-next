import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';


export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const redirectUrl = req.nextUrl.searchParams.get('redirect');

    const authPaths = ['/login', '/register', '/'];
    const protectedPaths = ['/dashboard'];
    const checkAuthPaths = ['/profile/']
    const isAuthPath = authPaths?.some((path) => pathname == path);
    const isPathProtected = protectedPaths?.some((path) => pathname == path);


    const res = NextResponse.next();

    if(isAuthPath) {
        const token = await getToken({req});
        if(token) {
            const url = new URL(redirectUrl ? redirectUrl: '/home', req.url);
            return NextResponse.redirect(url);
        }
    }
    else if(checkAuthPaths?.some((path) => pathname.includes(path))) {
        
        console.log('checking session', req.cookies.getAll())
        const token = await getToken({req});
        if(!token) {
            return res;  
        }
    }
    else if(isPathProtected) {
        const token = await getToken({req});
        console.log("token", token)
        console.log('req.url.pathname', req.url.pathname);
        console.log('req.url', req.url)
        if(!token) {
            const url = new URL('/login', req.url);
            console.log('url', url )
            url.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(url);
        }
    }
    return res;

}


export const config = {
    matcher: ['/dashboard', '/login', '/register', '/profile', '/profile/:path*']
}