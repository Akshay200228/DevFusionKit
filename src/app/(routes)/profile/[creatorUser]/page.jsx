"use client"
// [creatorUser].jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LivePreview, LiveProvider } from "react-live";
import axios from 'axios';
import { FaCode } from 'react-icons/fa';
import Container from '@/components/homeLayout/Container';

const CreatorUser = ({ params }) => {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;

    const [creatorData, setCreatorData] = useState({});
    const [codeComponents, setCodeComponents] = useState([]);
    const [webTemplates, setWebTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch creator data
                const creatorResponse = await axios.get(`${apiUrl}/api/users/${params.creatorUser}`);
                if (!creatorResponse.data) {
                    // User not found
                    setError({ message: 'User not found' });
                    setIsLoading(false);
                    return;
                }

                setCreatorData(creatorResponse.data);

                // Fetch code components if codeComponents is defined in creatorData
                if (creatorResponse.data.codeComponents) {
                    const codeComponentsResponse = await axios.get(`${apiUrl}/api/code-components/ids/${creatorResponse.data.codeComponents}`);
                    setCodeComponents(codeComponentsResponse.data);
                } else {
                    setCodeComponents([]);
                }

                // Fetch web templates if webTemplates is defined in creatorData
                if (creatorResponse.data.webTemplates && creatorResponse.data.webTemplates.length > 0) {
                    const webTemplatesResponse = await axios.get(`${apiUrl}/api/web-templates/details/${creatorResponse.data.webTemplates}`);
                    setWebTemplates(webTemplatesResponse.data);
                } else {
                    setWebTemplates([]);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiUrl, params.creatorUser]);

    const defaultAvatar = "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75";

    return (
        <Container>
            <div className="flex flex-col p-4 mx-auto mt-8 md:flex-row">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error && error.message === 'User not found' ? (
                    <h2>User not found</h2>
                ) : (
                    <div className="flex flex-col p-4 mx-auto md:flex-row">
                        {/* Left Column - User Info */}
                        <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
                            <div className="relative mx-auto mb-4 overflow-visible border-4 border-blue-500 rounded-full w-44 h-44 xl:w-56 xl:h-56">
                                <img
                                    src={creatorData?.avatar || defaultAvatar}
                                    alt={creatorData?.name}
                                    className="object-cover w-full h-full p-1 rounded-full"
                                />
                            </div>
                            <h1 className="mb-2 text-2xl font-semibold text-center md:text-left">{creatorData.name}</h1>
                            <p className="mb-2 text-center text-gray-600 md:text-left">{creatorData.username}</p>
                            <p className="mb-2 text-center text-gray-600 md:text-left">{creatorData.email}</p>
                        </div>

                        {/* Right Column - User Works */}
                        {/* Code Components Section */}
                        <div>
                            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Code Components</h2>
                            <div className="grid w-full grid-cols-1 gap-4 md:w-3/4 lg:grid-cols-2 xl:grid-cols-3">
                                {codeComponents.length === 0 ? (
                                    <p>No code components found</p>
                                ) : (
                                    codeComponents.map((component, index) => (
                                        <div key={index} className="mb-6">
                                            <div className="p-2 bg-white border rounded-lg shadow-md">
                                                <h4 className="mb-1 text-lg font-semibold text-blue-600">{component.title}</h4>
                                                <div className="h-[40vh] bg-blue-200 relative overflow-hidden rounded-lg">
                                                    <LiveProvider code={component.code} key={component._id}>
                                                        <div className="absolute inset-0 flex items-center justify-center text-neutral-950">
                                                            <LivePreview />
                                                        </div>
                                                    </LiveProvider>
                                                </div>
                                                <div className="flex justify-center mt-2 md:mt-4">
                                                    {/* Explore Button (Left Side) */}
                                                    <Link href={`/component/${component._id}`}>
                                                        <button className="px-4 py-2 text-white transition-transform duration-300 ease-in-out bg-blue-500 rounded-full hover:bg-blue-600">
                                                            <FaCode className="text-xl md:text-3xl" />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Web Templates Section */}
                            <>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Web Templates</h2>
                                <div className="grid w-full grid-cols-1 gap-4 md:w-3/4 lg:grid-cols-2 xl:grid-cols-3">
                                    {webTemplates.length === 0 ? (
                                        <p>No web templates found</p>
                                    ) : (
                                        webTemplates.map((template, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="p-2 bg-white border rounded-lg shadow-md">
                                                    <img src={template.templateImage} alt="templateImage" className="mb-4 rounded-md" />
                                                    <h4 className="mb-2 text-xl font-semibold">{template.title}</h4>
                                                    <p className="text-gray-600">{template.description}</p>
                                                    <div className="flex items-center justify-center mt-4">
                                                        <Link href={`/templates/${template._id}`}>
                                                            <button
                                                                className="px-6 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <FaCode className="text-3xl" />
                                                                    <span className="text-lg">Explore</span>
                                                                </div>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        </div>
                    </div>
                )}
            </div >
        </Container>
    );
};

export default CreatorUser;