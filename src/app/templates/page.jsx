import Image from 'next/image'; // Import next/image
import templateImage from '@/images/template.png'; // Import your image

export const metadata = {
  title: 'Template'
}

const cards = [
  {
    id: 1,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 1',
    description: 'This is a description for Website Template 1.',
  },
  {
    id: 2,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 2',
    description: 'This is a description for Website Template 2.',
  },
  {
    id: 3,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
  },
  {
    id: 4,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
  },
  {
    id: 5,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 1',
    description: 'This is a description for Website Template 1.',
  },
  {
    id: 6,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 2',
    description: 'This is a description for Website Template 2.',
  },
  {
    id: 7,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
  },
  {
    id: 8,
    imageUrl: templateImage, // Use the imported image
    title: 'Website Template 3',
    description: 'This is a description for Website Template 3.',
  },
  // Add more cards as needed
];

export default function Component() {
  return (
    <div className="w-full h-auto bg-white">
      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Provide Templates for Websites
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Here, you can explore a collection of website templates to kickstart your web projects.
          </p>
        </div>
      </div>

      <div className="px-4 mx-auto max-w-fit sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-lg">
              <div className="relative h-96"> 
                <Image
                  src={card.imageUrl}
                  alt={`Card Image ${card.id}`}
                  layout="fill" 
                  objectFit="fill" 
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{card.title}</h2>
                <p className="mt-2 text-gray-500">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
