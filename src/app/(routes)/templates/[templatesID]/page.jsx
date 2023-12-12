"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/homeLayout/Container';
import useApiFetch from '@/hooks/useApiFetch';
import Loader from '@/components/Loader';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const WebTemplatesDetails = ({ params }) => {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const WebTempApiUrl = `${apiUrl}/api/code-templates/${params.templatesID}`;

    const { data: webTemplate, isLoading, error } = useApiFetch(WebTempApiUrl);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!webTemplate) {
        return <div>No data found for the specified template ID</div>;
    }

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col lg:flex-row"
            >
                {/* Left side (templateImage) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="pr-8 lg:w-1/3"
                >
                    <img
                        src={webTemplate.templateImage}
                        alt={`Card Image ${webTemplate._id}`}
                        className="object-cover w-full h-auto rounded-lg"
                    />
                </motion.div>

                {/* Right side (title, description, links) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:w-2/3"
                >
                    <h2 className="mb-4 text-3xl font-semibold">{webTemplate.title}</h2>
                    <p className="mb-4 text-gray-600">{webTemplate.description}</p>

                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-start gap-4 mb-4"
                    >
                        <Link
                            href={webTemplate.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 text-2xl text-gray-700 rounded-full hover:bg-gray-100"
                        >
                            <FaGithub className="mr-2" />
                            GitHub
                        </Link>

                        <a
                            href={webTemplate.deployLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 text-2xl text-gray-700 rounded-full hover:bg-gray-100"
                        >
                            <FaExternalLinkAlt className="mr-2" />
                            Deployed Link
                        </a>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Thanks section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
            >
                <h3 className="mb-4 text-2xl font-semibold">Thanks for exploring our templates!</h3>
                <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at quam non libero pharetra convallis.
                    Proin ut vestibulum leo.
                </p>
            </motion.div>
        </Container>
    );
};

export default WebTemplatesDetails;
