import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Programs from "@/components/Programs";
import Coach from "@/components/Coach";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Loader />
      <SmoothScroll />
      <Nav />
      {/* Hero pins in place while Showcase scrolls up to cover it */}
      <div className="relative">
        <Hero />
        <Showcase />
      </div>
      <Programs />
      <Coach />
      <Journey />
      <Testimonials />
      <Cta />
      <Footer />
    </main>
  );
}
