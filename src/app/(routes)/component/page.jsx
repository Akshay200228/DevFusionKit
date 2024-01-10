"use client"
import CardComponent from "@/components/comLayout/CardComponent";
import { useSearch } from "@/context/SearchContext";
import { useAuth } from "@/hooks/useAuth";

export default function Component(context) {
  // console.log("object context: ", context)
  const page = parseInt(context.searchParams.page) || 1;

  const authData = useAuth();
  const user = authData.user;
  const userId = user ? user._id : null;
  const { searchQuery } = useSearch();
  const apiUrl = `${process.env.NEXT_PUBLIC_NEXUS_URL}/api/code-components?page=${page}&title=${searchQuery}`;

  return (
    <div className="w-full bg-white">
      <CardComponent
        user={user}
        userId={userId}
        apiUrl={apiUrl}
        page={page}
      />
    </div>
  );
}