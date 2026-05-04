import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    // Change password states
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to change doctor password
    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            return toast.error('Please fill all password fields')
        }
        if (newPassword.length < 8) {
            return toast.error('New password must be at least 8 characters')
        }
        if (newPassword !== confirmPassword) {
            return toast.error('New passwords do not match')
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/change-password', { currentPassword, newPassword }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                setShowChangePassword(false)
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2' rows={8} value={profileData.about} />
                                    : profileData.about
                            }
                        </p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
                    </p>

                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className='flex gap-1 pt-2'>
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label htmlFor="">Available</label>
                    </div>

                    {
                        isEdit
                            ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }

                    {/* ----- Change Password Section ----- */}
                    <hr className='my-5 border-gray-200' />
                    <div>
                        <button
                            onClick={() => setShowChangePassword(prev => !prev)}
                            className='text-gray-600 underline cursor-pointer text-sm font-medium'
                        >
                            {showChangePassword ? 'CANCEL PASSWORD CHANGE' : 'CHANGE PASSWORD'}
                        </button>

                        {showChangePassword && (
                            <div className='mt-3 flex flex-col gap-3 max-w-sm'>
                                <div>
                                    <p className='text-gray-600 font-medium mb-1 text-sm'>Current Password</p>
                                    <input
                                        className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-primary'
                                        type="password"
                                        placeholder='Enter current password'
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p className='text-gray-600 font-medium mb-1 text-sm'>New Password</p>
                                    <input
                                        className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-primary'
                                        type="password"
                                        placeholder='Min 8 characters'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p className='text-gray-600 font-medium mb-1 text-sm'>Confirm New Password</p>
                                    <input
                                        className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-primary'
                                        type="password"
                                        placeholder='Re-enter new password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleChangePassword}
                                    className='px-4 py-1 border border-primary text-sm rounded-full mt-1 hover:bg-primary hover:text-white transition-all w-fit'
                                >
                                    Update Password
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile