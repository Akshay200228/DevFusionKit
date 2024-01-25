import { IoClose } from 'react-icons/io5';

const AvatarModal = ({ imageUrl, closeModal }) => (
    <div className="fixed bg-slate-700 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-[70vh] w-96">
        <div className="absolute z-30 top-2 right-2">
            <button
                onClick={closeModal}
                className="p-2 text-white bg-blue-500 rounded-full hover:text-gray-300 focus:outline-none"
            >
                <IoClose className="text-2xl" />
            </button>
        </div>
        <img
            src={imageUrl}
            alt="Avatar"
            className="w-full h-full rounded-lg cursor-pointer"
            onClick={closeModal}
        />
    </div>
);

export default AvatarModal;