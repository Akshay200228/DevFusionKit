"use client"
// CodeCompDetails.js
import { useState } from 'react';
import Loader from '@/components/Loader';
import CodeDisplay from '@/components/comLayout/codeCompIds/CodeDisplay';
import CopyCodeButton from '@/components/comLayout/codeCompIds/CopyCodeButton';
import GoBackButton from '@/components/comLayout/codeCompIds/GoBackButton';
import useApiFetch from '@/hooks/useApiFetch';
import { useRef } from 'react';
import Message from '@/components/comLayout/create-code-comp/Message';
import { CodeCompDetailsSkeleton } from '@/components/SkeltonLoading';

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

    // const apiUrl = "https://devnexus-server.onrender.com";
    // const CompApiUrl = `http://localhost:8000/api/code-components/${params.codeCompIds}`;

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

    return (
        <div className="container p-8 mx-auto mt-8 bg-white rounded-lg shadow-lg">
            {isLoading ? (
                <CodeCompDetailsSkeleton />
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : codeComponent ? (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <GoBackButton />
                        <CopyCodeButton onCopy={handleCopyCode} />
                    </div>

                    <CodeDisplay code={codeComponent.code} liveEditorRef={liveEditorRef} />

                    <div className="flex items-center mt-4">
                        <img
                            src={codeComponent.creatorAvatar || "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75"}
                            alt="User Image"
                            width={36}
                            height={36}
                            className="mr-2 rounded-full"
                        />
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
