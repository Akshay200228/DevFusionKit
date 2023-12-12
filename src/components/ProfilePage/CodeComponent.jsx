"use client";
import { useState } from "react";
import { LivePreview, LiveProvider } from "react-live";
import CreateButton from "../CreateButton";
import EditCodeComponent from "./EditCodeComponent";
import axios from "axios";
import getCookie from "@/hooks/getCookie";
import { confirmAlert } from "react-confirm-alert"; // Import the confirmation dialog

import "react-confirm-alert/src/react-confirm-alert.css"; // Import the styles
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CodeComponent = ({ codeComponents }) => {
  const [editingComponent, setEditingComponent] = useState(null);

  const handleEdit = (component) => {
    setEditingComponent(component);
  };

  const handleCancelEdit = () => {
    setEditingComponent(null);
  };

  const handleDelete = (componentId) => {
    // Display confirmation dialog
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this code component?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const token = getCookie("token");
            try {
              // const apiUrl = "http://localhost:8000";
              // const apiUrl = "https://devnexus-server.onrender.com";
              const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
              await axios.delete(`${apiUrl}/api/code-components/delete/${componentId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            } catch (error) {
              console.error("Error deleting code component:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => { }, // Do nothing on cancel
        },
      ],
    });
  };

  return (
    <div className="mt-10 text-center">
      <h3 className="mb-8 text-3xl font-bold text-gray-800">Code Components</h3>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {editingComponent ? (
          <EditCodeComponent component={editingComponent} onCancelEdit={handleCancelEdit} />
        ) : codeComponents.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-8 text-gray-600">
            <p className="mb-4 text-2xl font-bold text-center">No code components found for this user.</p>
            <p className="mb-4 text-lg text-center text-gray-500">
              Explore amazing Components or create your first one now!
            </p>
            <CreateButton navigateTo="/code-comp" text="Create Code-Comp" />
          </div>
        ) : (
          codeComponents.map((component) => (
            <div key={component._id} className="p-4 mb-8 bg-white border rounded-lg shadow-md">
              <h4 className="mb-2 text-xl font-semibold text-blue-600">{component.title}</h4>
              <p className="mb-4 text-gray-700">{component.description}</p>
              <div className="h-[50vh] bg-blue-200 relative overflow-hidden rounded-lg">
                <LiveProvider code={component.code} key={component._id}>
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-950">
                    <LivePreview />
                  </div>
                </LiveProvider>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="flex items-center text-blue-500 transition duration-300 ease-in-out hover:text-blue-700"
                  onClick={() => handleEdit(component)}
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  className="flex items-center text-red-500 transition duration-300 ease-in-out hover:text-red-700"
                  onClick={() => handleDelete(component._id)}
                >
                  <FaTrashAlt className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CodeComponent;
