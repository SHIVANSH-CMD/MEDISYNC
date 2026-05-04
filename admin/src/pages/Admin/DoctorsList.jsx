import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors, removeDoctor, editDoctor } = useContext(AdminContext)

  const [editingDoctor, setEditingDoctor] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [editImage, setEditImage] = useState(null)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const handleDelete = async (docId, docName) => {
    if (window.confirm(`Are you sure you want to remove Dr. ${docName}? This action cannot be undone.`)) {
      await removeDoctor(docId)
    }
  }

  const openEditModal = (doctor) => {
    setEditingDoctor(doctor)
    setEditForm({
      name: doctor.name,
      speciality: doctor.speciality,
      degree: doctor.degree,
      experience: doctor.experience,
      fees: doctor.fees,
      about: doctor.about,
      address1: doctor.address?.line1 || '',
      address2: doctor.address?.line2 || '',
    })
    setEditImage(null)
  }

  const closeEditModal = () => {
    setEditingDoctor(null)
    setEditForm({})
    setEditImage(null)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('docId', editingDoctor._id)
    formData.append('name', editForm.name)
    formData.append('speciality', editForm.speciality)
    formData.append('degree', editForm.degree)
    formData.append('experience', editForm.experience)
    formData.append('fees', Number(editForm.fees))
    formData.append('about', editForm.about)
    formData.append('address', JSON.stringify({ line1: editForm.address1, line2: editForm.address2 }))

    if (editImage) {
      formData.append('image', editImage)
    }

    const success = await editDoctor(formData)
    if (success) {
      closeEditModal()
    }
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll w-full'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
              <div className='mt-3 flex items-center gap-2'>
                <button
                  onClick={() => openEditModal(item)}
                  className='flex-1 text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-all font-medium'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className='flex-1 text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-100 transition-all font-medium'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Edit Doctor Modal ---------- */}
      {editingDoctor && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl'>
            <div className='flex items-center justify-between p-6 border-b'>
              <h2 className='text-xl font-semibold text-gray-800'>Edit Doctor</h2>
              <button onClick={closeEditModal} className='text-gray-400 hover:text-gray-600 text-2xl leading-none'>&times;</button>
            </div>

            <form onSubmit={handleEditSubmit} className='p-6'>
              {/* Image */}
              <div className='flex items-center gap-4 mb-6'>
                <label htmlFor="edit-doc-img" className='cursor-pointer'>
                  <img
                    className='w-20 h-20 rounded-full object-cover border-2 border-gray-200'
                    src={editImage ? URL.createObjectURL(editImage) : editingDoctor.image}
                    alt=""
                  />
                </label>
                <input onChange={(e) => setEditImage(e.target.files[0])} type="file" id="edit-doc-img" hidden />
                <div>
                  <p className='text-sm text-gray-600'>Click to change photo</p>
                  <p className='text-xs text-gray-400'>Leave unchanged to keep current photo</p>
                </div>
              </div>

              <div className='flex flex-col lg:flex-row gap-8'>
                {/* Left Column */}
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Name</label>
                    <input
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      className='border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                      type="text" required
                    />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Experience</label>
                    <select
                      value={editForm.experience}
                      onChange={e => setEditForm({ ...editForm, experience: e.target.value })}
                      className='border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                    >
                      <option value="1 Year">1 Year</option>
                      <option value="2 Year">2 Years</option>
                      <option value="3 Year">3 Years</option>
                      <option value="4 Year">4 Years</option>
                      <option value="5 Year">5 Years</option>
                      <option value="6 Year">6 Years</option>
                      <option value="8 Year">8 Years</option>
                      <option value="9 Year">9 Years</option>
                      <option value="10 Year">10 Years</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Fees (₹)</label>
                    <input
                      value={editForm.fees}
                      onChange={e => setEditForm({ ...editForm, fees: e.target.value })}
                      className='border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                      type="number" required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Speciality</label>
                    <select
                      value={editForm.speciality}
                      onChange={e => setEditForm({ ...editForm, speciality: e.target.value })}
                      className='border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                    >
                      <option value="General physician">General physician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatricians">Pediatricians</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Degree</label>
                    <input
                      value={editForm.degree}
                      onChange={e => setEditForm({ ...editForm, degree: e.target.value })}
                      className='border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                      type="text" required
                    />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Address</label>
                    <input
                      value={editForm.address1}
                      onChange={e => setEditForm({ ...editForm, address1: e.target.value })}
                      className='border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                      type="text" placeholder='Address Line 1' required
                    />
                    <input
                      value={editForm.address2}
                      onChange={e => setEditForm({ ...editForm, address2: e.target.value })}
                      className='border rounded-lg px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                      type="text" placeholder='Address Line 2'
                    />
                  </div>
                </div>
              </div>

              {/* About */}
              <div className='mt-4'>
                <label className='text-sm font-medium text-gray-600'>About Doctor</label>
                <textarea
                  value={editForm.about}
                  onChange={e => setEditForm({ ...editForm, about: e.target.value })}
                  className='w-full mt-1 px-4 pt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                  rows={4} required
                ></textarea>
              </div>

              {/* Actions */}
              <div className='flex justify-end gap-3 mt-6 pt-4 border-t'>
                <button type='button' onClick={closeEditModal}
                  className='px-6 py-2.5 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-all font-medium text-sm'>
                  Cancel
                </button>
                <button type='submit'
                  className='px-6 py-2.5 bg-primary text-white rounded-full hover:opacity-90 transition-all font-medium text-sm'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorsList