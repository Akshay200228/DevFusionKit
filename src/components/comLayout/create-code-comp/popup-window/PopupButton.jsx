// PopupButton.js
const PopupButton = ({ label, icon, code, onClick }) => (
    <button
        onClick={() => onClick(code)}
        className="flex flex-col items-center justify-center w-auto h-auto gap-2 px-4 py-2 text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-md md:w-48 md:py-4 hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring focus:border-blue-300"
    >
        <span className='text-3xl'>{icon}</span>
        <span className="text-lg font-semibold">{label}</span>
        <div className="flex items-center mt-2 space-x-2">
            <span className="px-2 py-1 text-xs tracking-wider text-gray-800 uppercase bg-yellow-500 rounded-md">New</span>
            <span className="px-2 py-1 text-xs tracking-wider text-gray-800 uppercase bg-green-500 rounded-md">Hot</span>
        </div>
    </button>
);

export default PopupButton;
