import Link from 'next/link';

const CreateButton = ({ navigateTo, text }) => {
    return (
        <Link href={navigateTo}>
            <button className="px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full">
                {text}
            </button>
        </Link>
    )
}

export default CreateButton
