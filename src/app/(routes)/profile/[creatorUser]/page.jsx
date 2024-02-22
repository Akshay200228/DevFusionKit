"use client"
// [creatorUser].jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@/components/homeLayout/Container';
import Loader from '@/components/Loader';
import getCookie from '@/hooks/getCookie';
import AvatarModal from '@/components/ProfilePage/AllUserProfile/AvatarModal';
import UserInfo from '@/components/ProfilePage/AllUserProfile/UserInfo';
import CodeComponent from '@/components/ProfilePage/AllUserProfile/CodeComponent';
import WebTemplate from '@/components/ProfilePage/AllUserProfile/WebTemplate';
import useFollowerFollowing from '@/hooks/useFollowerFollowing';

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
  const [followUnfollowLoading, setFollowUnfollowLoading] = useState(false);
  const { followerCount, followingCount, updateCounts } = useFollowerFollowing();

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
        const response = await axios.get(`${apiUrl}/api/users/authUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
        setFollowUnfollowLoading(false);

        const creatorResponse = await axios.get(`${apiUrl}/api/users/${params.creatorUser}`);
        if (!creatorResponse.data) {
          setError({ message: 'User not found' });
          setIsLoading(false);
          return;
        }
        setCreatorData(creatorResponse.data);
        updateCounts(creatorResponse.data.followerCount || 0, creatorResponse.data.following.length || 0);

        if (creatorResponse.data.codeComponents) {
          const codeComponentsResponse = await axios.get(`${apiUrl}/api/code-components/ids/${creatorResponse.data.codeComponents}`);
          setCodeComponents(codeComponentsResponse.data);
        } else {
          setCodeComponents([]);
        }

        if (creatorResponse.data.webTemplates && creatorResponse.data.webTemplates.length > 0) {
          const webTemplatesResponse = await axios.get(`${apiUrl}/api/web-templates/details/${creatorResponse.data.webTemplates}`);
          setWebTemplates(webTemplatesResponse.data);
        } else {
          setWebTemplates([]);
        }

        await checkFollowingStatus();
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, params.creatorUser]);

  const handleFollow = async () => {
    try {
      setFollowUnfollowLoading(true);
      setIsFollowing(true);

      const token = getCookie('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.post(
        `${apiUrl}/api/users/follow`,
        { followUserId: params.creatorUser },
        { headers }
      );
      // Recheck following status to ensure accuracy
      await checkFollowingStatus();
      // updateCounts((prevCount) => prevCount + 1);
      updateCounts(followerCount + 1, followingCount);
    } catch (error) {
      console.error('Error while following user:', error);
    } finally {
      setFollowUnfollowLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      // Update local state immediately
      setFollowUnfollowLoading(true)
      setIsFollowing(false);

      const token = getCookie('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.post(
        `${apiUrl}/api/users/unfollow`,
        { unfollowUserId: params.creatorUser },
        { headers }
      );

      await checkFollowingStatus();
      // updateCounts((prevCount) => Math.max(prevCount - 1, 0));
      updateCounts(Math.max(followerCount - 1, 0), followingCount);
    } catch (error) {
      console.error('Error while unfollowing user:', error);
    } finally {
      setFollowUnfollowLoading(false);
    }
  };

  const defaultAvatar = "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75";

  return (
    <Container>
      <div className="flex flex-col min-h-screen p-2 mx-auto mt-8 md:p-4">
        {isLoading ? (
          <Loader />
        ) : error && error.message === 'User not found' ? (
          <h2>User not found</h2>
        ) : (
          <div className="flex flex-col md:flex-row">
            <UserInfo
              avatar={creatorData?.avatar || defaultAvatar}
              name={creatorData.name}
              username={creatorData.username}
              email={creatorData.email}
              portfolio={creatorData.portfolio}
              linkedin={creatorData.linkedin}
              github={creatorData.github}
              cityName={creatorData.cityName}
              stateName={creatorData.stateName}
              openImageModal={openImageModal}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
              followerCount={followerCount}
              followingCount={followingCount}
              followUnfollowLoading={followUnfollowLoading}
            />
            <div className="w-full">
              {/* Code Components Section */}
              <h2 className="mb-8 text-3xl font-extrabold tracking-wider text-center text-gray-800 uppercase">
                Code Components
              </h2>
              <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {codeComponents.map((component, index) => (
                  <CodeComponent
                    key={index}
                    title={component.title}
                    code={component.code}
                    componentId={component._id}
                  />
                ))}
              </div>
              <hr className="my-12 border-t border-gray-300" />

              {/* Web Templates Section */}
              <h2 className="mb-8 text-3xl font-extrabold tracking-wider text-center text-gray-800 uppercase">
                Web Templates
              </h2>
              <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {webTemplates.map((template, index) => (
                  <WebTemplate
                    key={index}
                    templateImage={template.templateImage}
                    title={template.title}
                    templateId={template._id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {isImageModalOpen && (
        <AvatarModal imageUrl={modalImageUrl} closeModal={closeImageModal} />
      )}
    </Container>
  );
};

export default CreatorUser;