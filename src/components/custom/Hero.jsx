import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-[1rem]'>
      <h2 className='font-extrabold text-[50px] text-center mt-10 '><span className='text-[#D41C1C] block'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips</h2>

      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to="/create-trip">
        <Button className="text-white px-6 py-3 text-lg rounded-lg shadow-md transition duration-300">
          Get Started, It's free
        </Button>
      </Link>


      <img src="/landing.png" alt="" className='w-[750px]' />

    </div>
  )
}

export default Hero