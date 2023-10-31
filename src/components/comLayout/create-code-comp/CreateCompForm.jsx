// CreateCompForm.jsx
import { useRouter } from 'next/navigation';
import LiveEditorPreview from './LiveEditorPreview';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { IoMdArrowRoundBack } from 'react-icons/io';

const CreateCompForm = ({
  formData,
  codeInput,
  loading,
  handleInputChange,
  handleCodeInputChange,
  handleSubmit,
}) => {
  const router = useRouter();
  const categories = ["Accordion", "Button", "Card", "Carousel", "Form", "Inputs", "Loaders", "Toast"];

  const handleGoBack = () => {
    router.back(); // Use the router's back() method to navigate back
  };


  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-full p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg"
    >
      <button
        onClick={handleGoBack}
        className="flex items-center justify-end px-4 py-2 my-4 text-white transition duration-300 bg-blue-300 rounded-lg hover:bg-blue-400"
      >
        <IoMdArrowRoundBack className="mr-2 " /> Go Back
      </button>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 text-sm font-bold text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 text-sm font-bold text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Use the LiveEditorPreview component here */}
      <LiveEditorPreview Input={codeInput} handleChange={handleCodeInputChange} />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="flex items-center justify-end w-auto px-6 py-3 mt-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
        <FiSend className="ml-2" />
      </motion.button>
    </motion.form>
  );
};

export default CreateCompForm;
