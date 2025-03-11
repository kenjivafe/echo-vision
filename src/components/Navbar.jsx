import React from 'react'

const Navbar = () => {
  return (
    <nav className='max-w-screen-xl px-5 mx-auto'>
        <div className="flex items-center justify-center text-center py-10">
            <a href="#!" className='flex flex-col mb-[-20px] mt-[-30px] text-4xl font-space-mono items-center justify-center'>
              <img src="/logo.png" alt="" className='w-40' />
              <span className="text-center mx-auto mt-[-20px]">Echo Vision</span>
            </a>
        </div>
    </nav>
  )
}

export default Navbar