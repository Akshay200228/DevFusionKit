// UserProfileContainer.jsx
import React from 'react';
import CodeComponent from './CodeComponent';
import WebTemplate from './WebTemplate';

const UserProfileContainer = ({ user, userData, codeComponentsData, webTemplatesData }) => {
    // Static data for location, followers, and social media links
    const location = "Mumbai, India";
    const followers = 5000;
    const socialMediaLinks = {
        twitter: "https://twitter.com/your_twitter",
        github: "https://github.com/your_github",
        linkedin: "https://linkedin.com/in/your_linkedin",
    };

    return (
        <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
            {/* Left Column - User Info */}
            <div className="flex-shrink-0 w-full mb-4 md:w-1/4 md:pr-8 md:mb-0">
                {/* Updated image styling */}
                <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden border-4 border-blue-500 rounded-full">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="object-cover w-full h-full"
                    />
                </div>
                <h1 className="mb-2 text-2xl font-semibold text-center md:text-left">{user.name}</h1>
                <p className="mb-2 text-center text-gray-600 md:text-left">{user.username}</p>
                <button className="w-full px-4 py-2 my-4 text-white bg-blue-500 rounded">Edit Profile</button>
                <p className="mb-2 text-center text-gray-600 md:text-left">{user.email}</p>
                {/* Additional user details */}
                <p className="mb-2 text-center text-gray-600 md:text-left">{location}</p>
                <p className="mb-2 text-center text-gray-600 md:text-left">{followers} followers</p>

                {/* Social media links */}
                <div className="flex justify-center space-x-4 md:justify-start">
                    <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
            </div>

            {/* Right Column - User Works */}
            <div className="w-full md:w-3/4">
                <h2 className="mb-4 text-2xl font-semibold">User Works</h2>

                {/* Display additional user data from the second API request */}
                {userData && (
                    <div>
                        <CodeComponent codeComponents={codeComponentsData} />
                        <WebTemplate webTemplates={webTemplatesData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfileContainer;
