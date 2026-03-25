import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/sections/Hero';
import MetricsBar from '@/components/sections/MetricsBar';
import Projects from '@/components/sections/Projects';
import WhyMe from '@/components/sections/WhyMe';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MetricsBar />
        <Projects />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
