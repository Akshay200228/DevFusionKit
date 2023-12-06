import React from 'react'

const WebTemplate = ({ webTemplates }) => {
    return (
        <div className="web-template">
            <h3 className="mb-4 text-2xl font-bold">Web Templates</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {webTemplates.map((template, index) => (
                    <div key={index} className="p-4 mb-8 border rounded shadow-md">
                        <img src={template.templateImage} alt="templateImage" />
                        <h4 className="mb-2 text-xl font-semibold">{template.title}</h4>
                        <p className="text-gray-600">{template.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default WebTemplate
