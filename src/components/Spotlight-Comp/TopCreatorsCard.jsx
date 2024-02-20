const TopCreatorsCard = ({ user, defaultAvatar }) => {
    return (
        <div key={user._id} className="flex overflow-hidden transition duration-300 bg-white rounded-lg shadow-xl hover:shadow-2xl">
            <div className="border border-r-2 border-r-gray-300 h-44 w-44">
                <img
                    src={user.avatar || defaultAvatar}
                    alt={user.name}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="w-2/3 p-6">
                <p className="mb-2 text-2xl font-semibold text-gray-800">{user.name}</p>
                <p className="mb-4 text-gray-600">@{user.username}</p>
                <div className="flex justify-between text-gray-600">
                    <p>Followers: {user.followers.length}</p>
                    <p>Following: {user.following.length}</p>
                </div>
            </div>
        </div>
    );
};

export default TopCreatorsCard;
