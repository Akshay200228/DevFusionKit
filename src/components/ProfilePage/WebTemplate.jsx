// WebTemplate.jsx
import CreateButton from '../CreateButton';

const WebTemplate = ({ webTemplates }) => {
    return (
        <div className="mt-10 text-center">
            <h3 className="mb-8 text-3xl font-bold text-gray-800">Web Templates</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {webTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-8 text-gray-600">
                        <p className="mb-4 text-2xl font-bold text-center">
                            No web templates found for this user.
                        </p>
                        <p className="mb-4 text-lg text-center text-gray-500">
                            Explore amazing templates or create your first one now!
                        </p>
                        <CreateButton navigateTo="/create-template" text="Create WebTemplate" />
                    </div>
                ) : (
                    webTemplates.map((template, index) => (
                        <div key={index} className="p-4 mb-8 border rounded shadow-md">
                            <img src={template.templateImage} alt="templateImage" className="mb-4 rounded-md" />
                            <h4 className="mb-2 text-xl font-semibold">{template.title}</h4>
                            <p className="text-gray-600">{template.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WebTemplate;
