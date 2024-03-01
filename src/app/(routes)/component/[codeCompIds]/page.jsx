// CodeCompDetails.js
import MainCodeComp from '@/components/comLayout/codeCompIds/MainCodeComp';

export async function generateMetadata({ params }) {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const response = await fetch(`${apiUrl}/api/code-components/${params.codeCompIds}`);
    const comp = await response.json();

    if (!comp)
        return {
            title: "Not Found",
            description: "The page is not found",
        };

    return {
        title: comp.title,
        description: comp.description,
        twitter: {
            title: comp.title,
            description: comp.description,
            creatorId: comp._id,
        },
        alternates: {
            canonical: `https://dev-nexus.vercel.app/component/${comp._id}`
        }
    }
}

const CodeCompDetails = ({ params }) => {
    return (
        <div className="container p-8 mx-auto my-8 bg-white rounded-lg shadow-lg">
            <MainCodeComp
                comParams={params}
            />
        </div>
    );
};

export default CodeCompDetails;
