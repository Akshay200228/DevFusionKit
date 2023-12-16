"use client";
// CodeComponent.js
import { useState } from "react";
import { LivePreview, LiveProvider } from "react-live";
import CreateButton from "../CreateButton";
import EditCodeComponent from "./EditCodeComponent";
import axios from "axios";
import getCookie from "@/hooks/getCookie";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomModal from "./CustomModal";
import Message from "../comLayout/create-code-comp/Message";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const CodeComponent = ({ codeComponents }) => {
  const [editingComponent, setEditingComponent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const handleEdit = (component) => {
    setEditingComponent(component);
  };

  const handleCancelEdit = () => {
    setEditingComponent(null);
  };

  const handleDelete = (componentId) => {
    // Display confirmation dialog
    setConfirmDelete({
      componentId,
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this code component?',
    });
  };

  const confirmDeleteHandler = async () => {
    const token = getCookie('token');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
      await axios.delete(`${apiUrl}/api/code-components/delete/${confirmDelete.componentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowDeleteMessage(true);
      window.location.reload(true);
    } catch (error) {
      console.error('Error deleting code component:', error);
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="mt-10 text-center">
      <h3 className="mb-8 text-3xl font-bold text-gray-800">Code Components</h3>

      {/* Rearranged logic: Check if codeComponents is empty or not */}
      {codeComponents.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8 text-gray-600">
          <p className="mb-4 text-2xl font-bold text-center">No code components found for this user.</p>
          <p className="mb-4 text-lg text-center text-gray-500">
            Explore amazing Components or create your first one now!
          </p>
          <CreateButton navigateTo="/code-comp" text="Create Code-Comp" />
        </div>
      ) : (
        <div >
          {editingComponent ? (
            <EditCodeComponent component={editingComponent} onCancelEdit={handleCancelEdit} />
          ) : (
            <div>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                grabCursor={true}
                loop={false}
                autoplay={{ delay: 3000 }} 
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1170: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                {codeComponents.map((component) => (
                  <SwiperSlide key={component._id}>
                    <div className="p-2 mb-4 bg-white border rounded-lg shadow-md">
                      <h4 className="mb-1 text-lg font-semibold text-blue-600">{component.title}</h4>
                      <p className="mb-2 text-gray-700">{component.description}</p>
                      <div className="h-[40vh] bg-blue-200 relative overflow-hidden rounded-lg">
                        <LiveProvider code={component.code} key={component._id}>
                          <div className="absolute inset-0 flex items-center justify-center text-neutral-950">
                            <LivePreview />
                          </div>
                        </LiveProvider>
                      </div>
                      <div className="flex justify-between mt-2 md:mt-4">
                        <button
                          className="flex items-center px-4 py-2 text-blue-500 transition duration-300 ease-in-out bg-blue-100 rounded-lg hover:text-blue-100 hover:bg-blue-600"
                          onClick={() => handleEdit(component)}
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button
                          className="flex items-center px-4 py-2 text-red-500 transition duration-300 ease-in-out bg-red-100 rounded-lg hover:text-red-100 hover:bg-red-600"
                          onClick={() => handleDelete(component._id)}
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
        </div>
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
  );
};

export default CodeComponent;
