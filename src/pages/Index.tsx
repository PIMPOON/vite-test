import { Hero } from '@/components/Hero'
import { Contact } from '@/components/Contact'
import { Services } from '@/components/Services'
import { Portfolio } from '@/components/Portfolio'
import { Materials } from '@/components/Materials'
import { About } from '@/components/About'
import { Map } from '@/components/Map'
import { Footer } from '@/components/Footer'

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Contact />
      <Services />
      <Portfolio />
      <Materials />
      <About />
      <Map />
      <Footer />
    </div>
  );
};

export default Index;