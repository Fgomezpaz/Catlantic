import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/hero/Hero';
import { Origination } from '../components/sections/Origination';
import { MarketBoard } from '../components/sections/MarketBoard';
import { TradeLanes } from '../components/sections/TradeLanes';
import { Logistics } from '../components/sections/Logistics';
import { Partners } from '../components/sections/Partners';
import { Compliance } from '../components/sections/Compliance';
import { Process } from '../components/sections/Process';
import { Metrics } from '../components/sections/Metrics';
import { Team } from '../components/sections/Team';
import { CallToAction } from '../components/sections/CallToAction';

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Origination />
        <MarketBoard />
        <TradeLanes />
        <Logistics />
        <Partners />
        <Compliance />
        <Process />
        <Metrics />
        <Team />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
