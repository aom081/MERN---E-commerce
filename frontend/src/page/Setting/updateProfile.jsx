import React from 'react'

const updateProfile = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Update Profile</h1>
        <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      className="max-w-sm rounded-lg shadow-2xl" />
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="name" placeholder="Your name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">upload Profile Photo</span>
            </label>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-secondary">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default updateProfile