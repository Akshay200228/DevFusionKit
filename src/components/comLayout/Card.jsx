import { cardData } from '@/constants'
import Image from 'next/image';


export default function Card() {
    return (
        <>
            {/* Scrollable Cards */}
            <div className="w-full overflow-y-auto text-white scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full" style={{ maxHeight: 'calc(100vh - 80px)' }}>
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cardData.map((card) => (
                        <div key={card.id} className="p-4 bg-white rounded-lg shadow-md">
                            <Image
                                src={card.imageUrl}
                                alt={`Card Image ${card.id}`}
                                width={400}
                                height={300}
                                priority
                                className="object-fill w-full h-40 mb-2 rounded-lg"
                            />
                            <h2 className="mb-2 text-xl font-semibold text-gray-600">{card.title}</h2>
                            <p className="text-gray-600">{card.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
