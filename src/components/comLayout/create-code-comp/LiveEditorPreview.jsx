import React from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

const LiveEditorPreview = ({ Input, handleChange }) => {
  return (
    <div className="h-[75vh] container p-4 bg-white rounded-lg shadow-lg lg:flex overflow-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-200">
      <LiveProvider code={Input}>
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
                onChange={handleChange}
                className="overflow-y-auto bg-slate-900 h-[70vh]"
              />
            </div>
          </div>
        </div>
      </LiveProvider>
    </div>
  );
};

export default LiveEditorPreview;
