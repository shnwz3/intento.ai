import { Features } from '../components/Features';
import { Hero } from '../components/Hero';
import { SecuritySection } from '../components/SecuritySection';
import { VideoDemo } from '../components/VideoDemo';

export function LandingPage() {
  return (
    <>
      <Hero />
      <div id="features">
        <Features />
      </div>
      <VideoDemo />
      <SecuritySection />
    </>
  );
}
