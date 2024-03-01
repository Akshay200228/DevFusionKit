import Container from '@/components/homeLayout/Container';
import TemplateById from '@/components/templateLayout/TemplateById';

export async function generateMetadata({ params }) {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const response = await fetch(`${apiUrl}/api/web-templates/${params.templatesID}`);
    const post = await response.json();
    if (!post)
        return {
            title: "Not Found",
            description: "The page is not found",
        };

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            images: [{ url: post.templateImage }]
        },
        twitter: {
            title: post.title,
            description: post.description,
            creatorId: post._id,
            images: [{ url: post.templateImage }]
        },
        alternates: {
            canonical: `https://dev-nexus.vercel.app/templates/${post._id}`
        }
    }
}

const WebTemplatesDetails = ({ params }) => {

    return (
        <Container className='min-h-screen'>
            <TemplateById params={params} />
        </Container>
    );
};

export default WebTemplatesDetails;
