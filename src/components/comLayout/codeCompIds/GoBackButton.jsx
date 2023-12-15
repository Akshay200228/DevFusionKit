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
            variant="blueOutline"
            color="outline"
            className="items-center text-blue-500 hover:bg-blue-50"
        >
            <IoMdArrowRoundBack className="mr-2" /> Go Back
        </Button>
    );
};

export default GoBackButton;
