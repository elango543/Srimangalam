import React from 'react'
import ContactUs from '../components/ContactUs'
import ServiceCards from '../components/ServiceCards'
import Slider from '../components/Slider'

export default function Home() {
  return (
    <div>
      <Slider/>

        
        <ServiceCards />
        <ContactUs />
      </div>
   
  )
}