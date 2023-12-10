// CodeDisplay.js
import { LiveProvider, LivePreview, LiveEditor } from 'react-live';

const CodeDisplay = ({ code, liveEditorRef }) => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <LiveProvider code={code}>
                <div className="mb-4 md:mb-0">
                    <div className="h-[50vh] mb-4 bg-blue-200 relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0 text-neutral-950">
                            <LivePreview />
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <pre
                        ref={liveEditorRef}
                        className="overflow-auto h-[50vh] bg-[#011627] p-4 rounded-lg"
                    >
                        <LiveEditor />
                    </pre>
                </div>
            </LiveProvider>
        </div>
    );
};

export default CodeDisplay;
