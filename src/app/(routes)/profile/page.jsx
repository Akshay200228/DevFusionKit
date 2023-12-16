"use client"
import React, { useEffect, useState } from 'react';
import Container from "@/components/homeLayout/Container";
import { useAuth } from "@/hooks/useAuth";
import axios from 'axios';
import UserProfileContainer from '@/components/ProfilePage/UserProfileContainer';
import Loader from '@/components/Loader';

export default function UserProfile() {
    const { user, error, isLoading } = useAuth();
    const [userData, setUserData] = useState(null);
    const [codeComponentsData, setCodeComponentsData] = useState([]);
    const [webTemplatesData, setWebTemplatesData] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user && user._id) {
                try {
                    // const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL || "http://localhost:8000";
                    // const apiUrl = "https://devnexus-server.onrender.com";
                    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
                    const userResponse = await axios.get(`${apiUrl}/api/users/${user._id}`);
                    console.log("User data:", userResponse.data);
                    setUserData(userResponse.data);

                    // Fetch detailed data for code components
                    const codeCompIds = userResponse.data.codeComponents.join(',');
                    // Check if there are code components IDs to fetch
                    if (codeCompIds) {
                        const codeComponentsResponse = await axios.get(`${apiUrl}/api/code-components/ids/${codeCompIds}`);
                        const codeComponentsData = codeComponentsResponse.data;
                        setCodeComponentsData(codeComponentsData.filter(Boolean)); // Filter out null values
                    } else {
                        console.log('No code components IDs to fetch');
                    }

                    // Fetch detailed data for web templates
                    const webTemplateIds = userResponse.data.webTemplates.join(',');
                    // Check if there are web template IDs to fetch
                    if (webTemplateIds) {
                        const webTemplatesResponse = await axios.get(`${apiUrl}/api/code-templates/details/${webTemplateIds}`);
                        const webTemplatesData = webTemplatesResponse.data;
                        setWebTemplatesData(webTemplatesData.filter(Boolean)); // Filter out null values
                    } else {
                        console.log('No web template IDs to fetch');
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, [user]);

    return (
        <Container>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="mt-8 text-center text-red-600">
                    Error: {error.message}
                </div>
            ) : (
                <UserProfileContainer
                    user={user}
                    userData={userData}
                    codeComponentsData={codeComponentsData}
                    webTemplatesData={webTemplatesData}
                    loading={isLoading}
                />
            )}
        </Container>
    );
}