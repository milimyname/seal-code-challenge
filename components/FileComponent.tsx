import { useState,MouseEvent } from 'react';
import { format } from 'date-fns'
import Link from 'next/link';
import Image from "next/image"
import { TypeDoc } from "../pages";

const FileComponent = ({doc}: {doc : TypeDoc}) => {
  const [numberOfDownloads, setNumberOfDownloads] = useState<number>(0);
  // Get Ext of File
  const handleExtension = (name: string)=>{
    if(name.includes(".doc") || name.includes(".docx")) return "word"
    if(name.includes(".csv") || name.includes(".xlsx") || name.includes(".xls")) return "excel"
    if(name.includes(".pdf")) return "pdf"
    if(name.includes(".png") || name.includes(".jpeg") || name.includes(".jpg") || name.includes(".svg")) return "image"
    if(name.includes(".txt")) return "text"
  }

  // save file
  const handleSave = async (e: MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    
    console.log('clicked')
   await fetch('/api/download')
    // setNumberOfDownloads(numberOfDownloads + 1);
  }
  

  return (
    <> 
    {doc.name.map(
      (name: string, i: number) => 
        (
            <div className={` bg-white rounded-lg py-5 px-5 shadow-xl shadow-${handleExtension(name)} transition ease-in hover:translate-y-[2px]`} key={i}>
              <div className="group flex justify-between items-start gap-5">
                <Image src={`/icons/${handleExtension(name)}.svg`} alt={`${name.split('.')[1]} icon`} width={22} height={27}/>
                <Link href=''>
                  <a className={`flex-1 transition ease-in group-hover:text-${handleExtension(name)} `}>
                    <h2 className="text-[1.6rem] font-bold ">{name.split('-')[0]}</h2> 
                  </a> 
                </Link>
                <Link href={`api/download?url=${doc.url[i]}`}>
                  <a>
                      <Image src="/icons/download.svg" alt="download icon" width={14} height={14}/>  
                  </a> 
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[1rem] text-black text-opacity-50 pl-[3rem]">{format(new Date(doc.createdAt), 'dd/MM/Y')}</p>
                <p className="text-black text-[1.2rem]">10</p>
              </div>
            </div>
        )
    )}
    </>
  )
}



export default FileComponent