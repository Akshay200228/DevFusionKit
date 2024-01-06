"use sever";

// Web temp data
export async function fetchWebTemp(currentPage) {
    const perPage = 12;
    const api = `http://localhost:8000/api/web-templates/paginated-web-templates?page=${currentPage}&perPage=${perPage}`;
    try {
        const response = await fetch(api);
        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetch server data: ", data);
        return data;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}
