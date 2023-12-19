import useProfileWorkEditForm from '@/hooks/useProfileWorkEditForm';
import { motion } from 'framer-motion';
import { FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';

const EditWebTemplate = ({ template, onCancelEdit }) => {
    const { loading, formData, handleChange, handleUpdate } = useProfileWorkEditForm({
        data: template,
        apiUrl: process.env.NEXT_PUBLIC_NEXUS_URL,
        updateEndpoint: 'web-templates',
    });

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleUpdate}
            className="w-auto p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg"
        >
            {/* Title */}
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-bold text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* githubLink */}
            <div className="mb-4">
                <label htmlFor="githubLink" className="block mb-2 text-sm font-bold text-gray-700">
                    GithubLink
                </label>
                <textarea
                    id="githubLink"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* deployLink */}
            <div className="mb-4">
                <label htmlFor="deployLink" className="block mb-2 text-sm font-bold text-gray-700">
                    DeployLink
                </label>
                <textarea
                    id="deployLink"
                    name="deployLink"
                    value={formData.deployLink}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* templateImage */}
            <div className="mb-4">
                <label htmlFor="templateImage" className="block mb-2 text-sm font-bold text-gray-700">
                    TemplateImage
                </label>
                <textarea
                    id="templateImage"
                    name="templateImage"
                    value={formData.templateImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            <div className="flex justify-between mt-4">
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <FaCheck className="mr-2" />
                            Update
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={loading}
                >
                    <FaTimes className="mr-2" />
                    Cancel
                </button>
            </div>
        </motion.form>
    );
};

export default EditWebTemplate;
