export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_NEXUS_URL;

    return[
        {url: baseUrl, lastModified: new Date()},
    ]
}