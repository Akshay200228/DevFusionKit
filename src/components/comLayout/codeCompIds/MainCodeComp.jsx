'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import useApiFetch from '@/hooks/useApiFetch';
import { useAuth } from '@/hooks/useAuth';
import { IoBookmark } from 'react-icons/io5';
import CodeDisplay from './CodeDisplay';
import GoBackButton from './GoBackButton';
import { CodeCompDetailsSkeleton } from '@/components/SkeltonLoading';

const MainCodeComp = ({ comParams }) => {
    const authData = useAuth();
    const user = authData.user;
    const userId = user ? user._id : null;

    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const CompApiUrl = `${apiUrl}/api/code-components/${comParams.codeCompIds}`;

    const { data: codeComponent, isLoading, error } = useApiFetch(CompApiUrl);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {isLoading ? (
                <CodeCompDetailsSkeleton />
            ) : error ? (
                <p>Error: {error}</p>
            ) : codeComponent ? (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <GoBackButton />
                    </div>

                    <CodeDisplay code={codeComponent.code} />

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <Link href={userId === codeComponent.createdBy ? `/profile` : `/profile/${codeComponent.createdBy}`}>
                                <img
                                    src={codeComponent.creatorAvatar || "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75"}
                                    alt="User Image"
                                    className="w-14 h-14 p-0.5 mr-2 border-2 border-blue-600 rounded-full cursor-pointer"
                                />
                            </Link>
                            <div>
                                <p className="text-lg font-bold text-gray-500">{codeComponent.title}</p>
                            </div>
                        </div>
                        {/* Bookmark button and count */}
                        <div className="flex items-center space-x-2">
                            <IoBookmark className="w-6 h-6 text-blue-500" />
                            <span className="text-gray-500">{codeComponent.bookmarks.length}</span>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default MainCodeComp
