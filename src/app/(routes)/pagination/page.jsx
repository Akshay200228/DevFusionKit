import { getCodeComp } from "@/app/action";
import PaginatedData from "@/components/PaginatedData";

export default async function Pagination(context) {
    // call api here
    const page = parseInt(context.searchParams.page) || 1;
    const data = await getCodeComp(page);

    console.log("Context: ", { context })
   
    return (
        <div className="flex items-center justify-center h-screen">
            <PaginatedData page={page} data={data} />
        </div>
    )
}

