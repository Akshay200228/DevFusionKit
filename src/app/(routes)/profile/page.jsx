"use client"
import Container from "@/components/homeLayout/Container";
import { useAuth } from "@/context/useAuth";

export default function UserProfile() {
    const { user, error, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Container>
                <div className="flex items-center justify-center mt-8">
                    <div className="w-32 h-32 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <div className="mt-8 text-center text-red-600">
                    Error: {error.message}
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="flex flex-col mt-8 lg:flex-row">
                <div className="lg:w-1/3 lg:pr-8">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="object-cover w-32 h-32 rounded-full"
                    />
                    <h1 className="text-2xl font-semibold">{user.name}</h1>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-semibold">User Content</h2>
                    <p>
                        This is where you can display user-specific content or additional
                        information about the user.
                    </p>
                </div>
            </div>
        </Container>
    );
}
