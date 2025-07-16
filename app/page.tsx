"use client"
import Hero from '@/components/Hero'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'

gsap.registerPlugin(ScrollTrigger)

const page = () => {


  return (
    <div className='relative h-screen w-full contain'>
    {/* <div className=' h-screen w-full'> */}
    <div>
    <Hero/>
    </div>
    {/* </div> */}
    <div className='h-screen page w-ful absolute bg-white'>page</div>
    </div>
  )
}

export default page