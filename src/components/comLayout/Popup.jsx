import Image from 'next/image';
import close from "@/images/logos/close.svg"

export default function Popup({ popupData, closePopup }) {

    return (
        popupData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative flex flex-col max-w-4xl p-10 mx-4 bg-white rounded-lg md:flex-row">
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 md:hidden hover:text-gray-700 focus:outline-none"
                    >
                        <Image
                            src={close}
                            alt="Close"
                            width={24}
                            height={24}
                        />
                    </button>
                    <div className="relative flex-shrink-0 w-full md:w-2/5">
                        <Image
                            src={popupData.imageUrl}
                            alt={`Popup Image`}
                            width={400}
                            height={300}
                            priority
                            className="object-fill max-w-full mb-2 rounded-lg cursor-pointer h-72"
                        />
                    </div>
                    <div className="mt-4 ml-0 md:ml-4 md:mt-0">
                        <button
                            onClick={closePopup}
                            className="absolute hidden text-gray-500 md:block top-2 right-2 hover:text-gray-700 focus:outline-none"
                        >
                            <Image
                                src={close}
                                alt="Close"
                                width={24}
                                height={24}
                            />
                        </button>
                        <h2 className="mt-2 text-xl font-semibold">{popupData.title}</h2>
                        <p className="text-gray-600">{popupData.content}</p>
                    </div>
                </div>
            </div>
        )
    );
}
