import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <section className='h-20 px-6 bg-amber-500 flex justify-between items-center'>
        <div className='flex justify-between items-center min-w-fit'>
            <Image
            className='rounded hover:opacity-90 cursor-pointer'
              src="/images/cafeteria-logo.png"
              alt='logo'
              width={50}
              height={50}
            />
            <div className=''>
              Bán chạy
            </div>
            <div className=''>
              Phân loại
            </div>
            <div className=''>
              Quản lý bàn
            </div>
        </div>
        <div className='flex justify-between items-center'>
          <div>Lịch sử giao dịch</div>
          <div>Tài khoản</div>
        </div>
    </section>
  )
}

export default Header