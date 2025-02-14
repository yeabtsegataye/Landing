import React from 'react'
import {Nav} from './Components/Nav'
import { Footer } from './Components/Footer'
import { Hero } from './Pages/Hero'
import { Services } from './Pages/Services'
import { About } from './Pages/About'
import { Service2 } from './Pages/Service2'
import { Portfolio } from './Pages/Portfolio'
import { Pricing } from './Pages/Pricing'
import { Contact } from './Pages/Contact'
export const Layout = () => {
  return (
    <>
    
    <Nav />
    <Hero/>
    <Services/>
    <About/>
    <Service2/>
    <Portfolio/>
    <Pricing/>
    <Contact/>
    <Footer/>
   
    </>
  )
}
