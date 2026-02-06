export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dashboard/',
        },
        sitemap: 'https://mohammed-kamal.netlify.app/sitemap.xml',
    }
}
