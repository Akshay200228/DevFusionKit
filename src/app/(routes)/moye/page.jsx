"use client";
import { useEffect, useState } from 'react';
import { LivePreview, LiveProvider } from 'react-live';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Moye = ({ searchParams }) => {
    const [codeComponents, setCodeComponents] = useState([]);
    const [page, setPage] = useState(searchParams.page || 1);
    const router = useRouter();

    useEffect(() => {
        // Update the URL when page changes
        router.push(`/moye?page=${page}`);
    }, [page, router]);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:8000/api/code-components?page=${page}`;

            try {
                // Fetch data from the server
                const res = await fetch(apiUrl);
                const data = await res.json();

                // Update the state with the fetched data
                setCodeComponents(data);
            } catch (error) {
                console.error(error);
                // Handle errors as needed
            }
        };

        // Call the fetchData function
        fetchData();
    }, [page]);

    const handleNextPage = () => {
        console.log("Current page:", page);
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            console.log("Next page:", nextPage);
            return nextPage;
        });
    };


    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    console.log("codeComponents: ", codeComponents);

    return (
        <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {codeComponents.map((codeComponent) => (
                <div key={codeComponent._id} className="relative flex flex-col h-full bg-white rounded-lg shadow-xl transform-style-preserve-3d hover:shadow-2xl">
                    <LiveProvider code={codeComponent.code}>
                        <div
                            className="min-h-[50vh] mb-4 bg-gradient-to-r from-blue-300 to-blue-200 relative overflow-hidden rounded-t-lg transform-style-preserve-3d"
                        >
                            <div className="absolute inset-0 text-neutral-950">
                                <LivePreview />
                            </div>
                        </div>
                    </LiveProvider>

                    <div className="flex items-center justify-between px-2 mb-2">
                        <div className="flex items-center space-x-3">
                            <Link
                                href={`/profile/${codeComponent.createdBy}`}
                                className="w-8 h-8 overflow-hidden rounded-full sm:w-12 sm:h-12"
                            >
                                <img
                                    src={codeComponent.creatorAvatar}
                                    alt="User Image"
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
                <span>Page {page}</span>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default Moye;
