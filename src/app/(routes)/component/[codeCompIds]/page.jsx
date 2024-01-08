"use client"
// CodeCompDetails.js
import { useState } from 'react';
import Link from 'next/link';
import CodeDisplay from '@/components/comLayout/codeCompIds/CodeDisplay';
import CopyCodeButton from '@/components/comLayout/codeCompIds/CopyCodeButton';
import GoBackButton from '@/components/comLayout/codeCompIds/GoBackButton';
import useApiFetch from '@/hooks/useApiFetch';
import { useRef } from 'react';
import Message from '@/components/comLayout/create-code-comp/Message';
import { CodeCompDetailsSkeleton } from '@/components/SkeltonLoading';
import { useAuth } from '@/hooks/useAuth';
import Breadcrumbs from '@/components/comLayout/codeCompIds/Breadcrumbs';
import { usePathname } from 'next/navigation';

// Function to copy text to clipboard
const copyToClipboard = (text, setMessage) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setMessage({ type: 'success', message: 'Code copied to clipboard!' });
};

const CodeCompDetails = ({ params }) => {
    const liveEditorRef = useRef(null);
    const [message, setMessage] = useState(null);

    const authData = useAuth();
    const user = authData.user;
    const userId = user ? user._id : null;

    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const CompApiUrl = `${apiUrl}/api/code-components/${params.codeCompIds}`;

    const { data: codeComponent, isLoading, error } = useApiFetch(CompApiUrl);

    const handleCopyCode = () => {
        const code = liveEditorRef.current.innerText;

        if (code) {
            copyToClipboard(code, setMessage);
        }
    };

    const closeMessage = () => {
        setMessage(null);
    };
    const pathname = usePathname();


    return (
        <div className="container p-8 mx-auto mt-8 bg-white rounded-lg shadow-lg">
            {isLoading ? (
                <CodeCompDetailsSkeleton />
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : codeComponent ? (
                <>
                    <Breadcrumbs pathname={pathname} />
                    <div className="flex items-center justify-between mb-4">
                        <GoBackButton />
                        <CopyCodeButton onCopy={handleCopyCode} />
                    </div>

                    <CodeDisplay code={codeComponent.code} liveEditorRef={liveEditorRef} />

                    <div className="flex items-center mt-4">
                        <Link href={userId === codeComponent.createdBy ? `/profile` : `/profile/${codeComponent.createdBy}`}>
                            <img
                                src={codeComponent.creatorAvatar || "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75"}
                                alt="User Image"
                                className="w-12 h-12 mr-2 rounded-full"
                            />
                        </Link>
                        {/* <h3>{}</h3> */}
                        <div>
                            <p className="text-sm text-gray-500">{codeComponent.description}</p>
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
