// GoBackButton.js
import Button from '@/components/homeLayout/Button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <Button
            onClick={handleGoBack}
            variant="solid"
            className="items-center hover:bg-blue-400"
        >
            <IoMdArrowRoundBack className="mr-2" /> Go Back
        </Button>
    );
};

export default GoBackButton;
