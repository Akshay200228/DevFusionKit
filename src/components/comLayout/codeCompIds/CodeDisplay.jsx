// CodeDisplay.js
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import { Editor } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import CopyCodeButton from './CopyCodeButton';

const CodeDisplay = ({ code }) => {
    const [liveCode, setLiveCode] = useState(code);
    const [isCopySuccess, setIsCopySuccess] = useState(false);

    useEffect(() => {
        setLiveCode(code);
    }, [code]);

    const handleEditorChange = (newValue, event) => {
        // Update the code in LiveProvider when the Editor changes
        setLiveCode(newValue);
    };

    const editorRef = useRef(null);
    const handleCopyCode = async () => {
        // Use getModel() to get the model of the editor
        const model = editorRef.current.getModel();

        // Use the format action to format the code
        await editorRef.current.trigger('source', 'editor.action.formatDocument');

        // Get the formatted code using getModel().getLinesContent()
        const lines = model.getLinesContent();
        const formattedCode = lines.join('\n');

        if (formattedCode) {
            copyToClipboard(formattedCode);
            setIsCopySuccess(true);

            // Reset the copy success state after 3 seconds
            setTimeout(() => {
                setIsCopySuccess(false);
            }, 3000);
        }
    };

    const copyToClipboard = (text) => {
        const textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <LiveProvider code={liveCode}>
                    <div className="relative mb-4 md:mb-0">
                        <div className="h-[50vh] mb-4 bg-blue-200 relative overflow-hidden rounded-lg">
                            <div className="absolute inset-0 text-neutral-950">
                                <LivePreview />
                                <LiveError />
                            </div>
                        </div>
                    </div>

                    <div className="relative col-span-1">
                        <Editor
                            height="50vh"
                            language="javascript" // Set the language according to your code
                            theme="vs-dark" // Set the theme according to your preference
                            value={code}
                            onChange={handleEditorChange}
                            options={{
                                minimap: {
                                    enabled: false,
                                },
                                scrollbar: {
                                    vertical: 'visible',
                                },
                            }}
                            // Set the editorRef
                            onMount={(editor) => {
                                editorRef.current = editor;
                            }}
                        />
                        <div className="absolute top-2 right-2">
                            <CopyCodeButton onCopy={handleCopyCode} isCopySuccess={isCopySuccess} />
                        </div>
                    </div>
                </LiveProvider>
            </div>
        </>
    );
};

export default CodeDisplay;
