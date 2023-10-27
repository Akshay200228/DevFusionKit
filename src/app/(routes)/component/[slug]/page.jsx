"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CodeComponentDetail() {
  const router = useRouter();
  const { slug } = router.query; // Extract "id" directly from router.query
  const [codeComponent, setCodeComponent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) { // Add a check to ensure "id" is defined
          console.log('Working........')
          const response = await fetch(`http://localhost:8000/api/code-components/${slug}`);
          console.log('Response is here', response)
          if (response.ok) {
            const data = await response.json();
            setCodeComponent(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div>
      {codeComponent ? (
        <div>
          <h1>{codeComponent.title}</h1>
          <p>{codeComponent.description}</p>
          {/* Render other code component details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
