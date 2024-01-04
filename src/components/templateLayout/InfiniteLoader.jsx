"use client";

// InfiniteLoader.jsx
import { fetchWebTemp } from "@/app/action";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import WebTempCard from "./WebTempCard";


export default function InfiniteLoader({ height = 'h-24' }) {
    const { ref, inView } = useInView();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (inView && !allDataLoaded && !loading) {
                setLoading(true); // Set loading to true when fetching
                try {
                    const newData = await fetchWebTemp(page);
                    if (newData.length > 0) {
                        setData((prevData) => [...prevData, ...newData]);
                        setPage((prevPage) => prevPage + 1);
                    } else {
                        setAllDataLoaded(true); // Stop loader when all data is loaded
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false); // Set loading to false when fetching is complete
                }
            }
        };

        fetchData();
    }, [inView, page, allDataLoaded, loading]);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {data.map((webtemp, index) => (
                    <WebTempCard key={webtemp._id} webtemp={webtemp} index={index}  />
                ))}
            </div>
            {!allDataLoaded && loading && (
                <div
                    className={`flex items-center justify-center ${height}`}
                >
                    <div className="w-16 h-16 border-t-4 border-b-4 border-red-700 rounded-full animate-spin" />
                </div>
            )}
            {!allDataLoaded && !loading && (
                <div
                    ref={ref}
                    className={`flex items-center justify-center ${height}`}
                >
                    <div className="w-16 h-16 border-t-4 border-b-4 border-red-500 rounded-full animate-spin" />
                </div>
            )}
            {allDataLoaded && (
                <h3 className="mt-4 text-xl text-center">Thank you for viewing!</h3>
            )}
        </>
    );
}
