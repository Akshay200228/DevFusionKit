"use client"
// CodeCompDetails.js
import Loader from '@/components/Loader';
import CodeDisplay from '@/components/comLayout/codeCompIds/CodeDisplay';
import CopyCodeButton from '@/components/comLayout/codeCompIds/CopyCodeButton';
import GoBackButton from '@/components/comLayout/codeCompIds/GoBackButton';
import useApiFetch from '@/hooks/useApiFetch';
import { useRef } from 'react';

// Function to copy text to clipboard
const copyToClipboard = (text) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
};

const CodeCompDetails = ({ params }) => {
    const liveEditorRef = useRef(null);

    const CompApiUrl = `http://localhost:8000/api/code-components/${params.codeCompIds}`;
    const { data: codeComponent, isLoading, error } = useApiFetch(CompApiUrl);

    const handleCopyCode = () => {
        const code = liveEditorRef.current.innerText;

        if (code) {
            copyToClipboard(code);
            alert('Code copied to clipboard!');
        }
    };

    return (
        <div className="container p-8 mx-auto mt-8 bg-white rounded-lg shadow-lg">
            {isLoading && <Loader />}
            {error && <p>Error: {error.message}</p>}
            {codeComponent && (
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
                        <h2 className="text-xl font-semibold text-gray-600">{codeComponent.title}</h2>
                    </div>
                </>
            )}
        </div>
    );
};

export default CodeCompDetails;
