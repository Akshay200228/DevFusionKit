"use client"
import { useRouter } from "next/navigation"

const PaginatedData = ({ page, data }) => {
    const router = useRouter()
    const handleNext = () => {
        const nextPage = page + 1;
        router.push(`/pagination?page=${nextPage}`);
    }
    const handlePrev = () => {
        const prevPage = page - 1;
        router.push(`/pagination?page=${prevPage}`);
    };
    const isFirstPage = page === 1;
    const isLastPage = data.length < 12;
    return (
        <>
            <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {data.map((card) => (
                    <div key={card._id}>{card.title}</div>
                ))}
                <div className="flex justify-between">
                    <button
                        onClick={handlePrev}
                        className="mr-2"
                        disabled={isFirstPage}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isLastPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default PaginatedData
