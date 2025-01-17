import Image from 'next/image'
import React from 'react'

export default function loading() {
  const imageUrl:string="https://digiflyeg.com/wp-content/uploads/2024/10/WhatsAppVideo2024-10-09at6.27.35PM-ezgif.com-video-to-gif-converter.gif"
  return (
    <div
    className='flex justify-center items-center h-screen bg-black/15 z-30'>
    <Image width={500} height={500} src={imageUrl} alt='loader'/>
  </div>
  )
}
