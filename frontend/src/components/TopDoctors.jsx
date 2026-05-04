import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-20 text-[#262626] md:mx-10'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 tracking-tight'>Top Doctors to Book</h1>
            <p className='sm:w-1/2 text-center text-sm md:text-base text-gray-500'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 group shadow-card hover:shadow-2xl' key={index}>
                        <div className='bg-gradient-to-b from-indigo-50 to-white overflow-hidden relative'>
                            <img className='w-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt="" />
                            <div className='absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>
                        <div className='p-6'>
                            <div className={`flex items-center gap-2 text-sm mb-3 ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                <span className="relative flex h-2.5 w-2.5">
                                  {item.available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></span>
                                </span>
                                <p className='font-medium'>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-gray-900 text-xl font-semibold mb-1 group-hover:text-primary transition-colors'>{item.name}</p>
                            <p className='text-gray-500 text-sm'>{item.speciality}</p>
                            <div className='mt-5 pt-4 border-t border-gray-50 flex items-center justify-between'>
                                <div className='w-full h-1 bg-gray-100 rounded-full overflow-hidden'>
                                    <div className='w-0 h-full bg-gradient-premium group-hover:w-full transition-all duration-500'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-gray-50 border border-gray-200 text-gray-700 px-12 py-3 rounded-full mt-12 hover:bg-gray-100 hover:shadow-md transition-all font-medium'>more</button>
        </div>

    )
}

export default TopDoctors