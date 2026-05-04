import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-gradient-premium rounded-3xl px-6 md:px-10 lg:px-20 relative overflow-hidden shadow-2xl'>
            {/* Subtle overlay for texture */}
            <div className='absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none'></div>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] relative z-10'>
                <p className='text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight drop-shadow-md tracking-tight'>
                    Book Appointment <br />  With Trusted Doctors
                </p>
                <div className='flex flex-col md:flex-row items-center gap-4 text-white text-base font-normal opacity-90 mt-2'>
                    <div className='relative inline-block p-1 rounded-full bg-white/20 backdrop-blur-md shadow-lg'>
                        <img className='w-28 relative z-10' src={assets.group_profiles} alt="" />
                    </div>
                    <p className='leading-relaxed'>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </div>
                <a href='#speciality' className='flex items-center gap-2 glass-panel hover:bg-white text-[#262626] font-semibold px-8 py-3.5 rounded-full text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 shadow-xl mt-4 group'>
                    Book appointment <img className='w-3 group-hover:translate-x-1 transition-transform' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative z-10 flex justify-center items-end'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg organic-mask filter drop-shadow-2xl' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header