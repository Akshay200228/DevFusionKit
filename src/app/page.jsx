import Account from "@/components/homeLayout/Account";
import CallToAction from "@/components/homeLayout/CallToAction";
import CodeEditor from "@/components/homeLayout/CodeEditor";
import Hero from "@/components/homeLayout/Hero";
import Reviews from "@/components/homeLayout/Reviews";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <CodeEditor />
      <Account />
      <Reviews />
      <CallToAction />
    </main>
  );
}
