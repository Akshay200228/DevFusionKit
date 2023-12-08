"use client"
// CodeComponentDetail.jsx
import { LivePreview, LiveProvider } from 'react-live';
import { devLogo } from '@/images';
import useApiFetch from '@/hooks/useApiFetch';
import Loader from '@/components/Loader';

export default function CodeComponentDetail({ slug }) {
    console.log("Slug ID: ", slug);
    const apiUrl = `https://devnexus-server.onrender.com/api/code-components/${slug}`;
    const { data: codeComponent, isLoading, error } = useApiFetch(apiUrl);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div>
                Error: {error.message} - This code component may not exist or there was an issue fetching data.
            </div>
        );
    }

    return (
        <div>
            <h1>{codeComponent.title}</h1>
            <LiveProvider code={codeComponent.code}>
                <div className="h-[50vh] mb-4 bg-blue-200 relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 text-neutral-950">
                        <LivePreview />
                    </div>
                </div>
            </LiveProvider>
            <div className="flex items-center">
                <img src={devLogo} alt="User Image" width={36} height={36} className="mr-2 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-600">{codeComponent.title}</h2>
            </div>
        </div>
    );
}
