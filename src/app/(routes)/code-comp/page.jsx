"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import Container from '@/components/homeLayout/Container';
import Button from '@/components/homeLayout/Button';
import getCookie from '@/context/getCookie';

const CreateCodeComponentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t\t//code here \n</div>',
  });

  const [codeInput, setCodeInput] = useState(formData.code);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCodeInputChange = (newCode) => {
    setCodeInput(newCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getCookie('token');
      console.log("Token", token);

      const updatedFormData = { ...formData, code: codeInput };

      const response = await axios.post(`http://localhost:8000/api/code-components/`, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Code component created:', response.data);
    } catch (error) {
      console.error('Error creating code component:', error);
    }
  };

  return (
    <Container>
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
        <div className="h-[75vh] container p-4 bg-white rounded-lg shadow-lg lg:flex overflow-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-200">
          <LiveProvider code={codeInput}>
            <div className="lg:w-1/2">
              {/* Show LivePreview */}
              <div className="bg-blue-200 h-[70vh]">
                <LivePreview />
                <LiveError />
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-6 lg:w-1/2">
              {/* Live preview using react-live */}
              <div className="h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-200">
                <div className='h-full'>
                  <LiveEditor
                    onChange={handleCodeInputChange}
                    className="overflow-y-auto bg-slate-900 h-[70vh]"
                  />
                </div>
              </div>
            </div>
          </LiveProvider>
        </div>
        <Button className="mt-4">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateCodeComponentForm;
