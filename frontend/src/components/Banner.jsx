import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-gradient-premium rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 relative overflow-hidden shadow-2xl'>
            {/* Subtle overlay for texture */}
            <div className='absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none'></div>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 relative z-10'>
                <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md tracking-tight'>
                    <p>Book Appointment</p>
                    <p className='mt-4'>With 100+ Trusted Doctors</p>
                </div>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='glass-panel text-gray-900 font-semibold px-8 py-3.5 rounded-full mt-8 hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl'>Create account</button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative z-10 flex justify-end items-end'>
                <img className='w-full absolute bottom-0 right-0 max-w-md organic-mask filter drop-shadow-2xl' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner