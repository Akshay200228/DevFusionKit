"use client";

// InfiniteLoader.jsx
import { fetchWebTemp } from "@/app/action";
import { useEffect, useRef, useState } from "react";
import WebTempCard from "./WebTempCard";

export default function InfiniteLoader({ height = 'h-24' }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  const fetchData = async () => {
    if (!allDataLoaded && !loading) {
      try {
        setLoading(true);
        const newData = await fetchWebTemp(page);
        if (newData.length > 0) {
          setData((prevData) => [...prevData, ...newData]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setAllDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20% 0px", // Adjust this value as needed
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchData();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, fetchData]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((webtemp) => (
          <WebTempCard key={webtemp._id} webtemp={webtemp} />
        ))}
      </div>
      {!allDataLoaded && loading && (
        <div className={`flex items-center justify-center ${height}`}>
          <div className="w-16 h-16 border-t-4 border-b-4 border-red-500 rounded-full animate-spin" />
        </div>
      )}
      {!allDataLoaded && !loading && (
        <div
          ref={loaderRef}
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
