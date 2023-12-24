// useComponent.js
import { useState } from 'react';
import axios from 'axios';
import getCookie from './getCookie';

const useComponent = (items, apiUrl, type, idKey) => {
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
            title: `Confirm to delete ${type}`,
            message: `Are you sure you want to delete this ${type}?`,
        });
    };

    const confirmDeleteHandler = async () => {
        const token = getCookie('token');
        try {
            const componentId = confirmDelete.componentId;
            await axios.delete(`${apiUrl}/api/${type}/delete/${componentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowDeleteMessage(true);
            window.location.reload(true);
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
        } finally {
            setConfirmDelete(null);
        }
    };

    return {
        editingComponent,
        confirmDelete,
        showDeleteMessage,
        handleEdit,
        handleCancelEdit,
        handleDelete,
        setConfirmDelete,
        confirmDeleteHandler,
    };
};

export default useComponent;