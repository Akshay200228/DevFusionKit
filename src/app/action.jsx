"use sever";
const perPage = 12;

export async function fetchWebTemp(currentPage) {
    const api = `http://localhost:8000/api/web-templates/paginated-web-templates?page=${currentPage}&perPage=${perPage}`;
    try {
        const response = await fetch(api);
        const data = await response.json();
        console.log("Fetch server data: ", data);
        return data;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}
