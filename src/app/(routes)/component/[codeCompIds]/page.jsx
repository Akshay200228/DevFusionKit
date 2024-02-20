"use client"
// CodeCompDetails.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CodeDisplay from '@/components/comLayout/codeCompIds/CodeDisplay';
import GoBackButton from '@/components/comLayout/codeCompIds/GoBackButton';
import useApiFetch from '@/hooks/useApiFetch';
import { useRef } from 'react';
import Message from '@/components/comLayout/create-code-comp/Message';
import { CodeCompDetailsSkeleton } from '@/components/SkeltonLoading';
import { useAuth } from '@/hooks/useAuth';
import Breadcrumbs from '@/components/comLayout/codeCompIds/Breadcrumbs';
import { usePathname } from 'next/navigation';
import { IoBookmark } from 'react-icons/io5';

const CodeCompDetails = ({ params }) => {
    const liveEditorRef = useRef(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const authData = useAuth();
    const user = authData.user;
    const userId = user ? user._id : null;

    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const CompApiUrl = `${apiUrl}/api/code-components/${params.codeCompIds}`;

    const { data: codeComponent, isLoading, error } = useApiFetch(CompApiUrl);

    const closeMessage = () => {
        setMessage(null);
    };

    const pathname = usePathname();
    const shortId = params.codeCompIds.slice(0, 5); // Extract the first 4 characters of the ID

    return (
        <div className="container p-8 mx-auto my-8 bg-white rounded-lg shadow-lg">
            {isLoading ? (
                <CodeCompDetailsSkeleton />
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : codeComponent ? (
                <>
                    <Breadcrumbs pathname={pathname} shortenedId={shortId} />
                    <div className="flex items-center justify-between mb-4">
                        <GoBackButton />
                    </div>

                    <CodeDisplay code={codeComponent.code} liveEditorRef={liveEditorRef} />

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

                    {/* Display the message if it exists */}
                    {message && <Message type={message.type} message={message.message} onClose={closeMessage} />}
                </>
            ) : null}
        </div>
    );
};

export default CodeCompDetails;
