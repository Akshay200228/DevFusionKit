import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";

const MessageBox = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative hidden rounded-xl lg:block">
      <AiOutlineMessage
        onClick={toggleDropdown}
        className="p-0.5 w-10 h-10 text-blue-600 cursor-pointer"
      />
    </div>
  );
};

export default MessageBox;