"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/homeLayout/Container';
import useApiFetch from '@/hooks/useApiFetch';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { WebTemplatesDetailsSkeleton } from '@/components/SkeltonLoading';
import GoBackButton from '@/components/comLayout/codeCompIds/GoBackButton';


const WebTemplatesDetails = ({ params }) => {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    const WebTempApiUrl = `${apiUrl}/api/web-templates/${params.templatesID}`;

    const { data: webTemplate, isLoading, error } = useApiFetch(WebTempApiUrl);

    if (isLoading) {
        return <WebTemplatesDetailsSkeleton />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!webTemplate) {
        return <div>No data found for the specified template ID</div>;
    }

    return (
        <Container>
            <div className="flex items-center justify-between mb-4">
                <GoBackButton />
            </div>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row"
            >
                {/* Left side (templateImage) */}
                <motion.div
                    className="pr-8 md:w-1/3"
                    initial={{ x: -100, opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    whileTap={{ scale: 0.9 }}

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
                    className="md:w-2/3"
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
