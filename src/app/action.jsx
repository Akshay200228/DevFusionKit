"use sever";

// Web temp data
export async function fetchWebTemp(currentPage) {
    const perPage = 12;
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const WebTempApiUrl = `${apiUrl}/api/web-templates/paginated-web-templates?page=${currentPage}&perPage=${perPage}`;
    try {
        const response = await fetch(WebTempApiUrl);
        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}
