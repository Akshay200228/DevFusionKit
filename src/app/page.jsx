import Account from "@/components/homeLayout/Account";
import CallToAction from "@/components/homeLayout/CallToAction";
import CodeEditor from "@/components/homeLayout/CodeEditor";
import Feature from "@/components/homeLayout/Feature";
import Hero from "@/components/homeLayout/Hero";
import Reviews from "@/components/homeLayout/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <CodeEditor />
      <Reviews />
      <Account />
      <CallToAction />
    </main>
  );
}
