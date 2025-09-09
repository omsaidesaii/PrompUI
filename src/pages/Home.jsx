import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Select from 'react-select';
import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import Editor from '@monaco-editor/react';

const Home = () => {


  const options = [
  { value: 'html-css', label: 'HTML + CSS' },
  { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
  { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
  { value: 'html-css-js', label: 'HTML + CSS + JS' },
  { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
];

  const [outputScreen, setOutputScreen] = useState(false)

  return (
    <>
        <Navbar/>
        <div className="flex items-center px-[100px] gap-[30px] justify-between">
          <div className="left w-[50%] h-[auto] py-[30px] rounded-xl bg-[#141319] mt-5 p-[20px]">
            <h3 className='text-[25px] font-semibold sp-text'>AI Component Generator</h3>
            <p className='text-[gray] mt-2 text-[16px]'>Describe your component, and let AI code for you.</p>
           <p className='text-[15px] font-[700] mt-4'>Framework</p>
            <Select
            className='mt-2'
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
                boxShadow: "none",
                "&:hover": { borderColor: "#555" }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111",
                color: "#fff"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#333"
                  : state.isFocused
                    ? "#222"
                    : "#111",
                color: "#fff",
                "&:active": { backgroundColor: "#444" }
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" })
            }}
          />
          <p className='text-[15px] font-[700] mt-5'>Describe your component</p>
          <textarea className='w-full min-h-[200px] rounded-xl bg-[#09090B] mt-3 p-[10px]' placeholder='Describe your component in detail, and AI will generate the code for you.'></textarea>
          <div className="flex items-center justify-between">
            <p className='text-[gray]'>Click on Generate button to generate your code</p>
          <button className='generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 mt-3 px-[20px] cursor-pointer gap-[10px] transition-all hover:opacity-[.8]'><i> <BsStars/> </i> Generate</button>
         </div>
        </div>
        <div className="right w-[50%] h-[80vh] bg-[#141319] mt-2 rounded-xl">
          {
              outputScreen===false?
              <>
            <div className='skeleton w-full h-full flex items-center flex-col justify-center'>
              <div className="circle p-[20px] w-[70px] h-[70px] rounded-[50%] bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-[30px]"><HiOutlineCode/></div>
             <p className='text-[16px] text-[gray] mt-3'>Your component & code will appear here.</p>
          </div>
              </>: <>
              <Editor height="100%" defaultLanguage="javascript" defaultValue="//some comment" />
              </>
          }
        </div>
        </div>
    </>
  )
}

export default Home