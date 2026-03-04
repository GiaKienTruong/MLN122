import Nav from './components/Nav'
import Hero from './components/Hero'
import ThiTruong from './components/ThiTruong'
import ChuThe from './components/ChuThe'
import GTTD from './components/GTTD'
import Simulator from './components/Simulator'
import Game from './components/Game'
import { CaseStudy, KetLuan, Footer } from './components/CaseStudy'
import { Divider } from './components/UI'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Divider />
      <ThiTruong />
      <Divider />
      <ChuThe />
      <Divider />
      <GTTD />
      <Divider />
      <Simulator />
      <Divider />
      <Game />
      <Divider />
      <CaseStudy />
      <Divider />
      <KetLuan />
      <Footer />
    </>
  )
}
