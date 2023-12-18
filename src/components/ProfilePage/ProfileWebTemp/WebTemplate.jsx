"use client"
// WebTemplate.jsx
import { useState } from 'react';
import CreateButton from '../../CreateButton';
import EditWebTemplate from './EditWebTemplate';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Message from '@/components/comLayout/create-code-comp/Message';
import CustomModal from '../CustomModal';
import getCookie from '@/hooks/getCookie';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const WebTemplate = ({ webTemplates }) => {
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const handleEdit = (template) => {
        setEditingTemplate(template);
    };

    const handleCancelEdit = () => {
        setEditingTemplate(null);
    };

    const handleDelete = (webTempId) => {
        console.log("Here web Template id: ", webTempId)
        // Display confirmation dialog
        setConfirmDelete({
            webTempId,
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this web Template?',
        });
    };

    const confirmDeleteHandler = async () => {
        const token = getCookie('token');
        try {
            // const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
            // const apiUrl = "http://localhost:8000";
            const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
            await axios.delete(`${apiUrl}/api/web-templates/delete/${confirmDelete.webTempId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowDeleteMessage(true);
            window.location.reload(true);
        } catch (error) {
            console.error('Error deleting web Template:', error);
        } finally {
            setConfirmDelete(null);
        }
    };

    return (
        <div className="mt-10 text-center">
            <h3 className="mb-8 text-3xl font-bold text-gray-800">Web Templates</h3>

            {webTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-8 text-gray-600">
                    <p className="mb-4 text-2xl font-bold text-center">
                        No web templates found for this user.
                    </p>
                    <p className="mb-4 text-lg text-center text-gray-500">
                        Explore amazing templates or create your first one now!
                    </p>
                    <CreateButton navigateTo="/create-template" text="Create WebTemplate" />
                </div>
            ) : (
                <div>
                    {editingTemplate ? (
                        <EditWebTemplate template={editingTemplate} onCancelEdit={handleCancelEdit} />
                    ) : (
                        <div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                grabCursor={true}
                                loop={false}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                speed="3000"
                                modules={[Autoplay]}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 10,
                                    },
                                    1024: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    1170: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {webTemplates.map((template) => (
                                    <SwiperSlide key={template._id}>
                                        <div className="p-4 mb-8 border rounded shadow-md">
                                            <img src={template.templateImage} alt="templateImage" className="mb-4 rounded-md" />
                                            <h4 className="mb-2 text-xl font-semibold">{template.title}</h4>
                                            <p className="text-gray-600">{template.description}</p>

                                            {/* Button to open edit modal */}
                                            <div className="flex justify-between mt-2 md:mt-4">

                                                <button
                                                    onClick={() => handleEdit(template)}
                                                    className="flex items-center px-4 py-2 text-blue-500 transition duration-300 ease-in-out bg-blue-100 rounded-lg hover:text-blue-100 hover:bg-blue-600"
                                                >
                                                    <FaEdit className="mr-1" />
                                                    Edit
                                                </button>
                                                <button
                                                    className="flex items-center px-4 py-2 text-red-500 transition duration-300 ease-in-out bg-red-100 rounded-lg hover:text-red-100 hover:bg-red-600"
                                                    onClick={() => handleDelete(template._id)}
                                                >
                                                    <FaTrashAlt className="mr-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    {/* Edit Web Template Modal */}
                    {editingTemplate && (
                        <EditWebTemplate
                            onCancelEdit={handleCancelEdit}
                            template={editingTemplate}
                        />
                    )}

                    {confirmDelete && (
                        <CustomModal
                            title={confirmDelete.title}
                            message={confirmDelete.message}
                            onConfirm={confirmDeleteHandler}
                            onCancel={() => setConfirmDelete(null)}
                        />
                    )}
                    {/* Show the delete success message when showDeleteMessage is true */}
                    {showDeleteMessage && (
                        <Message type="error" message="Item deleted successfully" onClose={() => setShowDeleteMessage(false)} />
                    )}
                </div>
            )}
        </div>
    );
};

export default WebTemplate;
