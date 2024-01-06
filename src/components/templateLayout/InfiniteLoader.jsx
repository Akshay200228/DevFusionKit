"use client";

// InfiniteLoader.jsx
import { fetchWebTemp } from "@/app/action";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import WebTempCard from "./WebTempCard";
import { TemplateCardsSkeleton } from "../SkeltonLoading";
import Loader from "../Loader";

const loadingDelay = 2000; // 2 seconds delay for loading indicator

export default function InfiniteLoader() {
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
                    // Delay before fetching next data (e.g., 500 milliseconds)
                    await new Promise(resolve => setTimeout(resolve, 500));
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
                    setTimeout(() => {
                        setLoading(false); // Set loading to false after a delay
                    }, loadingDelay);
                }

            }
        };

        fetchData();
    }, [inView, page, allDataLoaded, loading]);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((webtemp, index) => (
                    <WebTempCard key={webtemp._id} webtemp={webtemp} index={index} />
                ))}
            </div>

            {loading && <Loader height="h-24" />}

            {!allDataLoaded && !loading && (
                <div ref={ref}>
                    <TemplateCardsSkeleton count={9} />
                </div >
            )}

            {allDataLoaded && (
                <h3 className="mt-4 text-xl text-center">Thank you for viewing!</h3>
            )}
        </>
    );
}
