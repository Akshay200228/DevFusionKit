"use client";
import Loader from "@/components/Loader";
import useApiFetch from "@/hooks/useApiFetch";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LivePreview, LiveProvider, LiveEditor } from 'react-live';

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
    const router = useRouter();
    const liveEditorRef = useRef(null);

    const CompApiUrl = `https://devnexus-server.onrender.com/api/code-components/${params.codeCompIds}`;
    const { data: codeComponent, isLoading, error } = useApiFetch(CompApiUrl);

    const handleGoBack = () => {
        router.back();
    };

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
                        <button
                            onClick={handleGoBack}
                            className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-300 rounded-lg hover:bg-blue-400"
                        >
                            <IoMdArrowRoundBack className="mr-2" /> Go Back
                        </button>
                        <button
                            onClick={handleCopyCode}
                            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                            Copy Code
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <LiveProvider code={codeComponent.code}>
                            <div className="mb-4 md:mb-0">
                                <div className="h-[50vh] mb-4 bg-blue-200 relative overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 text-neutral-950">
                                        <LivePreview />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <pre
                                    ref={liveEditorRef}
                                    className="overflow-auto h-[50vh] bg-[#1E1E1E] p-4 rounded-lg"
                                >
                                    <LiveEditor />
                                </pre>
                            </div>
                        </LiveProvider>
                    </div>

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
