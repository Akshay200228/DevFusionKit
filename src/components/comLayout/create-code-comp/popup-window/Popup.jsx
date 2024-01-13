// Popup.js
import { HiX } from 'react-icons/hi';

const Popup = ({ onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-4 mx-2 w-full md:w-auto my-4 bg-white rounded-md shadow-md md:my-0 md:p-8 md:mx-4 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-end">
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <HiX className="text-2xl" />
                </button>
            </div>
            {children}
        </div>
    </div>
);

export default Popup;
