// UserProfileContainer.jsx
import CodeComponent from './CodeComponent';
import WebTemplate from './WebTemplate';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Button from '../homeLayout/Button';


const UserProfileContainer = ({ user, userData, codeComponentsData, webTemplatesData }) => {
    // Static data for location, followers, and social media links
    const location = "Mumbai, India";
    const followers = 5000;
    const socialMediaLinks = {
        twitter: "https://twitter.com/your_twitter",
        github: "https://github.com/your_github",
        linkedin: "https://linkedin.com/in/your_linkedin",
    };

    const contributionsData = [
        { date: '2023-01-01', count: 50 },
        { date: '2023-01-02', count: 1 },
        { date: '2023-01-03', count: 22 },
        { date: '2023-01-04', count: 12 },
        { date: '2023-02-05', count: 65 },
        { date: '2023-03-05', count: 58 },
        { date: '2023-04-05', count: 11 },
        // Add more contribution data as needed
    ];
    const classForValue = (value) => {
        if (!value) {
            return 'color-empty';
        }

        const count = value.count;

        if (count > 15) {
            return 'color-github-4';
        } else if (count > 10) {
            return 'color-github-3';
        } else if (count > 5) {
            return 'color-github-2';
        } else if (count > 0) {
            return 'color-github-1';
        } else {
            return 'color-github-0';
        }
    };

    return (
        <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
            {/* Left Column - User Info */}
            <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
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
                <Button variant="blueOutline" color="outline" href="#" className="w-full my-4 font-bold hover:bg-blue-100 active:bg-blue-400">
                    Edit Profile
                </Button>

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
                {/* Display additional user data from the second API request */}
                {userData && (
                    <div>
                        <CodeComponent codeComponents={codeComponentsData} />
                        <WebTemplate webTemplates={webTemplatesData} />
                    </div>
                )}

                {/* Contribution heatmap */}
                <div className="mt-8">
                    <h3 className="mb-4 text-2xl font-semibold">Contribution Heatmap</h3>
                    <CalendarHeatmap
                        startDate={new Date('2023-01-01')}
                        endDate={new Date()} // Use the current date or another end date as needed
                        values={contributionsData}
                        classForValue={classForValue}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserProfileContainer;
