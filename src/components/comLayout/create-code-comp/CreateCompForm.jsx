// CreateCompForm.jsx
import LiveEditorPreview from './LiveEditorPreview'; // Import LiveEditorPreview component
import Button from '@/components/homeLayout/Button';
const CreateCompForm = ({
  formData,
  codeInput,
  loading,
  handleInputChange,
  handleCodeInputChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto mt-4">
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

      {/* Use the LiveEditorPreview component here */}
      <LiveEditorPreview Input={codeInput} handleChange={handleCodeInputChange} />

      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default CreateCompForm;
