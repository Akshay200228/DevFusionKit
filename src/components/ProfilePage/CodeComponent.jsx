// UserProfileData.jsx
import React from 'react';
import { LivePreview, LiveProvider } from 'react-live';

const CodeComponent = ({ codeComponents }) => {
    return (
        <div className="code-component">
            <h3 className="mb-4 text-2xl font-bold">Code Components</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {codeComponents.map((component) => (
                    <div key={component._id} className="p-4 mb-8 border rounded shadow-md">
                        <h4 className="mb-2 text-xl font-semibold">{component.title}</h4>
                        <p className="mb-4 text-gray-600">{component.description}</p>
                        <div className="h-[50vh] bg-blue-200 relative">
                            <LiveProvider code={component.code} key={component._id}>
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-950">
                                    <LivePreview />
                                </div>
                            </LiveProvider>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default CodeComponent;
