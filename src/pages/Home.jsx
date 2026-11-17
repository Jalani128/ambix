import HeroSlider from '../components/home/HeroSlider'
import TechMarquee from '../components/home/TechMarquee'
import ServiceExplorer from '../components/home/ServiceExplorer'
import ProblemPicker from '../components/home/ProblemPicker'
import NewServiceLines from '../components/home/NewServiceLines'
import MethodSteps from '../components/home/MethodSteps'
import MarketStats from '../components/home/MarketStats'
import IndustriesCarousel from '../components/home/IndustriesCarousel'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TechMarquee />
      <ServiceExplorer />
      <ProblemPicker />
      <NewServiceLines />
      <MethodSteps />
      <MarketStats />
      <IndustriesCarousel />
    </>
  )
}
