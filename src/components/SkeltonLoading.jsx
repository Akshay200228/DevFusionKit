import Container from "./homeLayout/Container";

// Card skelton loader
export const CardSkeleton = ({ count }) => {
    return (
        <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {[...Array(count)].map((_, index) => (
                <div key={index} className="relative h-full p-4 overflow-hidden bg-white rounded-lg shadow-xl">
                    <div className="h-[50vh] mb-4 bg-gray-300 rounded-lg skeleton-shimmer" />
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full skeleton-shimmer" />
                            <div>
                                <div className="h-6 mb-1 bg-gray-300 rounded skeleton-shimmer" />
                                <div className="h-4 bg-gray-300 rounded skeleton-shimmer" />
                            </div>
                        </div>
                        <div className="w-1/4 h-10 px-4 py-2 bg-gray-300 rounded-full skeleton-shimmer" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// Profile Skelton Loader
export const ProfileSkeltonLoading = () => {
    return (
        <div className="animate-pulse">
            <div className="flex items-center">
                <div className="w-12 h-12 mr-4 bg-gray-300 rounded-full skeleton-shimmer"></div>
                <div className="flex flex-col skeleton-shimmer">
                    <div className="w-20 h-4 mb-2 bg-gray-300"></div>
                    <div className="w-16 h-4 bg-gray-300"></div>
                </div>
            </div>
        </div>
    )
}

// CodeCompDetails skelton loader
export const CodeCompDetailsSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4 skeleton-shimmer">
                {/* Placeholder for Buttons */}
                <div className="w-24 h-8 bg-gray-300 rounded-lg" />
                <div className="w-24 h-8 bg-gray-300 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 skeleton-shimmer">
                <div className="mb-4 md:mb-0">
                    <div className="h-[50vh] mb-4 bg-gray-300 rounded-lg" /> {/* Placeholder for LivePreview */}
                </div>
                <div className="col-span-1">
                    <div className="overflow-auto h-[50vh] bg-gray-300 p-4 rounded-lg" /> {/* Placeholder for LiveEditor */}
                </div>
            </div>

            <div className="flex items-center mt-4">
                <div className="w-12 h-12 mr-2 overflow-hidden bg-gray-300 rounded-full skeleton-shimmer" /> {/* Placeholder for user avatar */}
                <div className="flex flex-col skeleton-shimmer">
                    <div className="w-20 h-4 mb-2 bg-gray-300"></div>
                    <div className="w-16 h-4 bg-gray-300"></div>
                </div>
            </div>
        </div>
    );
};

// WebTemplatesDetailsSkeleton.js
export const WebTemplatesDetailsSkeleton = () => {
    return (
        <Container className="animate-pulse">
            <div className="flex flex-col md:flex-row">
                {/* Left side (templateImage) */}
                <div className="pr-8 md:w-1/3 skeleton-shimmer">
                    <div className="w-full h-[50vh] md:h-72 lg:h-[50vh] mb-8 bg-gray-300 rounded-lg" />
                </div>

                {/* Right side (title, description, links) */}
                <div className="md:w-2/3 ">
                    <div className="h-8 mb-4 text-3xl font-semibold bg-gray-300 rounded-lg skeleton-shimmer" />
                    <div className="h-20 mb-4 ml-0 text-gray-600 bg-gray-300 rounded-lg skeleton-shimmer" />

                    {/* Links */}
                    <div className="flex justify-start gap-4 mb-4 skeleton-shimmer">
                        <div className="w-24 h-8 bg-gray-300 rounded-lg" /> {/* Placeholder for GitHub link */}
                        <div className="w-24 h-8 bg-gray-300 rounded-lg" /> {/* Placeholder for Deployed Link */}
                    </div>
                </div>
            </div>

            {/* Thanks section */}
            <div className="mt-8 skeleton-shimmer">
                <h3 className="h-8 mb-4 text-2xl font-semibold bg-gray-300 rounded-lg" /> {/* Placeholder for thanks heading */}
                <p className="h-16 text-gray-600 bg-gray-300 rounded-lg" /> {/* Placeholder for thanks description */}
            </div>
        </Container>
    );
};

// TemplateCardsSkeleton.js
export const TemplateCardsSkeleton = ({ count }) => {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(count)].map((_, index) => (
                <div key={index} className="rounded-lg shadow-lg bg-blue-50 animate-pulse">
                    <div className="bg-gray-300 rounded-t-lg h-96 w-80 skeleton-shimmer" />
                    <div className="p-4">
                        <div className="w-2/3 h-6 mb-4 bg-gray-300 rounded-lg skeleton-shimmer" />
                        <div className="w-full h-4 mb-2 bg-gray-300 rounded-full skeleton-shimmer" />

                        <div className="flex justify-center mt-4 skeleton-shimmer">
                            <div className="h-10 bg-gray-300 rounded-full w-36" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


// UserProfileSkeleton.js
export const UserProfileSkeleton = () => {
    return (
        <>
            <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
                {/* Right Column - User Works (Mimicking code component display) */}
                <div className="flex justify-between space-x-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="rounded-lg shadow-lg bg-blue-50 animate-pulse">
                            <div className="bg-gray-300 rounded-t-lg h-96 w-80 skeleton-shimmer" />
                            <div className="p-4">
                                <div className="flex justify-between mt-2 md:mt-4">
                                    <button
                                        className="flex items-center px-8 py-4 bg-gray-300 rounded-lg"
                                    />
                                    <button
                                        className="flex items-center px-8 py-4 bg-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
                {/* Right Column - User Works (Mimicking code component display) */}
                <div className="flex justify-between space-x-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="rounded-lg shadow-lg bg-blue-50 animate-pulse">
                            <div className="bg-gray-300 rounded-t-lg h-96 w-80 skeleton-shimmer" />
                            <div className="p-4">
                                <div className="flex justify-between mt-2 md:mt-4">
                                    <button
                                        className="flex items-center px-8 py-4 bg-gray-300 rounded-lg"
                                    />
                                    <button
                                        className="flex items-center px-8 py-4 bg-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export const UserProfileAvatarSkeleton = () => {
    return (
        <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full animate-pulse">
            <div className="w-full h-full bg-gray-300 rounded-full" />
        </div>
    );
};
