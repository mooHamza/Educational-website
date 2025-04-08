import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import blue_background from "../images/blue_background.jpg";

const Footer = () => {
  return (
    <div
    style={{backgroundImage:`url(${blue_background})`}}
    className='py-[150px]  flex justify-center bg-no-repeat bg-center bg-cover'>
        <div className='flex justifiy-center'>
        <div>
        <div className='flex justify-center gap-4'>
        <a
        className='hover:scale-125 duration-300'
         href="#"><FaFacebook className='text-4xl text-blue-700' /></a>
        <a
        className='hover:scale-125 duration-300'
         href="#"><FaYoutube  className='text-4xl text-red-600'/></a>
        </div>
        <p className='text-lg font-semibold text-subwhite p-2'>تم صنع هذه المنصة بهدف تهيئة الطالب ل كامل جوانب الثانوية العامه وما بعدها</p>
        </div>
        </div>
    </div>
  )
}

export default Footer