"use client"
// [creatorUser].jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LivePreview, LiveProvider } from "react-live";
import axios from 'axios';
import { FaCode } from 'react-icons/fa';
import Container from '@/components/homeLayout/Container';
import Loader from '@/components/Loader';
import { IoClose } from 'react-icons/io5';
import getCookie from '@/hooks/getCookie';
import { useAuth } from '@/hooks/useAuth';

const CreatorUser = ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;

  const [creatorData, setCreatorData] = useState({});
  const [codeComponents, setCodeComponents] = useState([]);
  const [webTemplates, setWebTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageUrl('');
  };

  const checkFollowingStatus = async () => {
    try {
      const token = getCookie('token');
      if (token) {
        const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
        const response = await axios.get(`${apiUrl}/api/users/authUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Responese babe: ", response.data)
        const currentUserFollowing = response.data.following || [];
        setIsFollowing(currentUserFollowing.includes(params.creatorUser));
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error('Error checking following status:', error);
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch creator data
        const creatorResponse = await axios.get(`${apiUrl}/api/users/${params.creatorUser}`);
        if (!creatorResponse.data) {
          // User not found
          setError({ message: 'User not found' });
          setIsLoading(false);
          return;
        }

        setCreatorData(creatorResponse.data);

        // Fetch code components if codeComponents is defined in creatorData
        if (creatorResponse.data.codeComponents) {
          const codeComponentsResponse = await axios.get(`${apiUrl}/api/code-components/ids/${creatorResponse.data.codeComponents}`);
          setCodeComponents(codeComponentsResponse.data);
        } else {
          setCodeComponents([]);
        }

        // Fetch web templates if webTemplates is defined in creatorData
        if (creatorResponse.data.webTemplates && creatorResponse.data.webTemplates.length > 0) {
          const webTemplatesResponse = await axios.get(`${apiUrl}/api/web-templates/details/${creatorResponse.data.webTemplates}`);
          setWebTemplates(webTemplatesResponse.data);
        } else {
          setWebTemplates([]);
        }

        // Check if the current user is following the displayed user
        await checkFollowingStatus();
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, params.creatorUser]);

  // Function to handle follow action
  const handleFollow = async () => {
    const token = getCookie('token');
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.post(
        `${apiUrl}/api/users/follow`,
        { followUserId: params.creatorUser },
        { headers }
      );

      setIsFollowing(true);
      // Check and update following status after following
      await checkFollowingStatus();
    } catch (error) {
      console.error('Error while following user:', error);
      // Handle error
    }
  };

  const handleUnfollow = async () => {
    try {
      const token = getCookie('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.post(
        `${apiUrl}/api/users/unfollow`,
        { unfollowUserId: params.creatorUser },
        { headers }
      );

      setIsFollowing(false);
      // Check and update following status after unfollowing
      await checkFollowingStatus();
    } catch (error) {
      console.error('Error while unfollowing user:', error);
    }
  };


  const defaultAvatar = "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75";

  return (
    <Container>
      <div className="flex flex-col p-2 mx-auto mt-8 md:p-4">
        {isLoading ? (
          <Loader />
        ) : error && error.message === 'User not found' ? (
          <h2>User not found</h2>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Left Column - User Info */}
            <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
              <div className="relative mx-auto mb-4 overflow-visible border-4 border-blue-500 rounded-full w-44 h-44 xl:w-56 xl:h-56">
                <img
                  src={creatorData?.avatar || defaultAvatar}
                  alt={creatorData?.name}
                  className="object-cover w-full h-full p-1 rounded-full"
                  onClick={() => openImageModal(creatorData.avatar || defaultAvatar)}
                />
                {isImageModalOpen && (
                  <div className="fixed bg-slate-700 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-[70vh] w-96">
                    <div className="absolute z-30 top-2 right-2">
                      <button
                        onClick={closeImageModal}
                        className="p-2 text-white bg-blue-500 rounded-full hover:text-gray-300 focus:outline-none"
                      >
                        <IoClose className="text-2xl" />
                      </button>
                    </div>
                    <img
                      src={modalImageUrl}
                      alt="Avatar"
                      className="w-full h-full rounded-lg cursor-pointer"
                      onClick={closeImageModal}
                    />
                  </div>
                )}
              </div>
              {/* Follow Button */}
              {isFollowing ? (
                <button onClick={handleUnfollow} className="w-full px-4 py-2 font-bold text-white bg-red-800 rounded-full hover:bg-blue-600">
                  Unfollow
                </button>
              ) : (
                <button onClick={handleFollow} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600">
                  Follow
                </button>
              )}

              <h1 className="mb-2 text-2xl font-semibold text-center md:text-left">{creatorData.name}</h1>
              <p className="mb-2 text-center text-gray-600 md:text-left">{creatorData.username}</p>
              <p className="mb-2 text-center text-gray-600 md:text-left">{creatorData.email}</p>
            </div>

            {/* Right Column - User Works */}
            <div className="w-full">
              {/* Code Components Section */}
              <h2 className="mb-8 text-3xl font-extrabold tracking-wider text-center text-gray-800 uppercase">
                Code Components
              </h2>
              <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {codeComponents.length === 0 ? (
                  <div className="flex items-center justify-center h-40 col-span-full">
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-600">
                        Oh no! The creativity well is temporarily dry for this user&apos;s code components.
                        <span className="ml-2" role="img" aria-label="sad-face">
                          😢
                        </span>
                        <span className="ml-1" role="img" aria-label="empty-canvas">
                          🎨
                        </span>
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        Don&apos;t worry, every artist needs a break! Encourage them to sprinkle some magic soon.
                        <span className="ml-1" role="img" aria-label="sparkles">
                          ✨
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  codeComponents.map((component, index) => (
                    <div key={index} className="mb-6">
                      <div className="p-2 bg-white border rounded-lg shadow-md">
                        <h4 className="mb-1 text-lg font-semibold text-blue-600">{component.title}</h4>
                        <div className="h-[40vh] bg-blue-200 relative overflow-hidden rounded-lg">
                          <LiveProvider code={component.code} key={component._id}>
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-950">
                              <LivePreview />
                            </div>
                          </LiveProvider>
                        </div>
                        <div className="flex justify-center mt-2 md:mt-4">
                          {/* Explore Button (Left Side) */}
                          <Link href={`/component/${component._id}`}>
                            <button className="px-4 py-2 text-white transition-transform duration-300 ease-in-out bg-blue-500 rounded-full hover:bg-blue-600">
                              <FaCode className="text-xl md:text-3xl" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Horizontal line */}
              <hr className="my-12 border-t border-gray-300" />

              {/* Web Templates Section */}
              <>
                <h2 className="mb-8 text-3xl font-extrabold tracking-wider text-center text-gray-800 uppercase">
                  Web Templates
                </h2>
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {webTemplates.length === 0 ? (
                    <div className="flex items-center justify-center h-40 col-span-full">
                      <div className="text-center">
                        <h4 className="text-lg font-bold text-gray-600">
                          Oh no! The creativity well is temporarily dry for this user&apos;s web templates.
                          <span className="ml-2" role="img" aria-label="sad-face">
                            😢
                          </span>
                          <span className="ml-1" role="img" aria-label="empty-canvas">
                            🎨
                          </span>
                        </h4>
                        <p className="mt-2 text-sm text-gray-500">
                          Don&apos;t worry, every artist needs a break! Encourage them to sprinkle some magic soon.
                          <span className="ml-1" role="img" aria-label="sparkles">
                            ✨
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    webTemplates.map((template, index) => (
                      <div key={index} className="mb-4">
                        <div className="p-2 bg-white border rounded-lg shadow-md">
                          <img
                            src={template.templateImage}
                            alt="templateImage"
                            className="object-cover w-full mb-4 rounded-md aspect-w-16 aspect-h-9 h-96"
                          />
                          <h4 className="mb-2 text-xl font-semibold">{template.title}</h4>
                          <div className="flex items-center justify-center mt-4">
                            <Link href={`/templates/${template._id}`}>
                              <button
                                className="px-6 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
                              >
                                <div className="flex items-center space-x-2">
                                  <FaCode className="text-3xl" />
                                  <span className="text-lg">Explore</span>
                                </div>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CreatorUser;
