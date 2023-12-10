// CopyCodeButton.js
import React from 'react';
import Button from '@/components/homeLayout/Button';
import { IoMdCopy } from 'react-icons/io';

const CopyCodeButton = ({ onCopy }) => {
    const handleCopyCode = () => {
        onCopy();
    };

    return (
        <Button
            onClick={handleCopyCode}
            variant="blueOutline"
            color="outline"
            className="text-blue-500 transition duration-300 border border-blue-500 hover:bg-blue-50 hover:text-blue-700"
        >
            <IoMdCopy className="mr-2 text-xl animate-bounce" /> Copy Code
        </Button>
    );
};

export default CopyCodeButton;
