import TopCreatorsSection from "@/components/Spotlight-Comp/Top-creators/TopCreatorsSection";
import TopPostsSection from "@/components/Spotlight-Comp/Top-posts/TopPostsSection";
import Container from "@/components/homeLayout/Container";

export const metadata = {
    title: 'Spotlight'
}

const Spotlight = () => {
    return (
        <Container>
            <div className="min-h-screen px-4 py-8">
                <TopPostsSection />
                <hr className="my-12 border-t border-gray-300" />
                <TopCreatorsSection />
            </div>
        </Container>
    );
};

export default Spotlight;
