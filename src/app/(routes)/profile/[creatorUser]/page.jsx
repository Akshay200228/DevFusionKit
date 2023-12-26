"use client"
import useApiFetch from "@/hooks/useApiFetch";
import { LivePreview, LiveProvider } from "react-live";

const CreatorUser = ({ params }) => {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const { data: creatorData, isLoading, error } = useApiFetch(`${apiUrl}/api/users/${params.creatorUser}`) || {};
    console.log("Creator Data: ", creatorData)

    const { data: codeComponents, isLoading: codeComponentsLoading, error: codeComponentsError } = useApiFetch(`${apiUrl}/api/code-components/ids/${creatorData.codeComponents}`) || {};
    console.log("codeComponents Data: ", codeComponents)
    const { data: webTemplates, isLoading: webTemplatesLoading, error: webTemplatesError } = useApiFetch(`${apiUrl}/api/web-templates/details/${creatorData.webTemplates}`) || {};
    const defaultAvatar = "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75";
    console.log("webTemplates Data: ", webTemplates)

    return (
        <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
            {/* Left Column - User Info */}
            <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
                {/* Updated image styling */}
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
            <div className="grid w-full grid-cols-1 gap-4 md:w-3/4 lg:grid-cols-2 xl:grid-cols-3">
                {codeComponents && codeComponents.map((component, index) => (
                    <div key={index} className="mb-4">
                        {/* Add other details you want to display for each code component */}
                        <div className="p-2 bg-white border rounded-lg shadow-md">
                            <h4 className="mb-1 text-lg font-semibold text-blue-600">{component.title}</h4>
                            <p className="mb-2 text-gray-700">{component.description}</p>
                            <div className="h-[40vh] bg-blue-200 relative overflow-hidden rounded-lg">
                                <LiveProvider code={component.code} key={component._id}>
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-950">
                                        <LivePreview />
                                    </div>
                                </LiveProvider>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default CreatorUser
