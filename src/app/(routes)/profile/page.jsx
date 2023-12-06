"use client"
import React, { useEffect, useState } from 'react';
import Container from "@/components/homeLayout/Container";
import { useAuth } from "@/hooks/useAuth";
import axios from 'axios';
import UserProfileContainer from '@/components/ProfilePage/UserProfileContainer';


export default function UserProfile() {
    const { user, error, isLoading } = useAuth();
    const [userData, setUserData] = useState(null);
    const [codeComponentsData, setCodeComponentsData] = useState([]);
    const [webTemplatesData, setWebTemplatesData] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user && user._id) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL || "http://localhost:8000";
                    const userResponse = await axios.get(`${apiUrl}/api/users/${user._id}`);
                    console.log("User data:", userResponse.data);
                    setUserData(userResponse.data);

                    // Fetch detailed data for code components
                    const codeComponentsResponse = await axios.get(`${apiUrl}/api/code-components/ids/${userResponse.data.codeComponents.join(',')}`);
                    const codeComponentsData = codeComponentsResponse.data;
                    setCodeComponentsData(codeComponentsData.filter(Boolean)); // Filter out null values

                    // Fetch detailed data for web templates
                    const webTemplatesResponse = await axios.get(`${apiUrl}/api/code-templates/details/${userResponse.data.webTemplates.join(',')}`);
                    const webTemplatesData = webTemplatesResponse.data;
                    setWebTemplatesData(webTemplatesData.filter(Boolean)); // Filter out null values
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
                <div className="flex items-center justify-center mt-8">
                    <div className="w-32 h-32 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
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
                />
            )}
        </Container>
    );
}