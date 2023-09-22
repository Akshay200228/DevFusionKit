import Sidebar from '@/components/comLayout/Sidebar';
import SearchBar from '@/components/comLayout/SearchBar';
import Card from '@/components/comLayout/card';

export default function Component() {

  return (
    <div className="flex h-[100vh]">
      {/* Responsive SideBar */}
      <Sidebar />

      {/* Right Showcase Work */}
      <div className="w-full bg-gray-100">

        {/* Search Input */}
        <SearchBar />

        {/* Scrollable Cards */}
        <Card />
      </div>
    </div>
  );
}