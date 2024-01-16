import React from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import { Editor } from '@monaco-editor/react';

const LiveEditorPreview = ({ Input, handleChange }) => {
  return (
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
            {/* <LiveEditor
              onChange={handleChange}
              className="overflow-y-auto bg-[#011627] h-[70vh]"
            /> */}
            <Editor
              height="70vh"
              language="javascript" // Set the language according to your code
              theme="vs-dark" // Set the theme according to your preference
              onChange={handleChange}
              value={Input}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
          </div>
        </div>
      </div>
    </LiveProvider>
  );
};

export default LiveEditorPreview;
