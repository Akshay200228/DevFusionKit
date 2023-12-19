import { useState } from 'react';
import axios from 'axios';
import getCookie from './getCookie';


const useProfileWorkEditForm = ({ data, apiUrl, updateEndpoint, onCancelEdit, customFields = {} }) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        ...data,
        ...customFields,
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const token = getCookie('token');
        try {
            setLoading(true);

            const response = await axios.put(
                `${apiUrl}/api/${updateEndpoint}/update/${data._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(`${updateEndpoint} updated successfully:`, response.data);
            onCancelEdit();
        } catch (error) {
            console.error(`Error updating ${updateEndpoint}:`, error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        formData,
        handleChange,
        handleUpdate,
    };
};

export default useProfileWorkEditForm;
