import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-20 text-[#262626] bg-gray-50/50 rounded-3xl my-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 tracking-tight'>Find by Speciality</h1>
            <p className='sm:w-1/2 text-center text-sm md:text-base text-gray-500'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-scroll px-6 pb-4'>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300 group' key={index}>
                        <div className='w-20 sm:w-28 h-20 sm:h-28 mb-4 flex justify-center items-center rounded-full bg-gradient-to-tr from-indigo-50 to-blue-50 shadow-md group-hover:shadow-xl border border-white group-hover:border-indigo-100 transition-all'>
                            <img className='w-12 sm:w-16 drop-shadow-sm group-hover:scale-110 transition-transform duration-300' src={item.image} alt="" />
                        </div>
                        <p className='font-medium text-gray-700 group-hover:text-primary transition-colors'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu