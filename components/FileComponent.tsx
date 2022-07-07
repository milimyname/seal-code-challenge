import Image from "next/image"
import { useRouter } from "next/router"

const FileComponent = () => {
  const router = useRouter();

  const handleRedirection = () => {
    router.push("/preview/excel");
  }
  
  return (
    <div className={`bg-white rounded-lg py-5 px-5 shadow-excel `} onClick={handleRedirection} >
      <div className="flex justify-between items-center gap-5">
        <Image src="/icons/excel.svg" alt="excel icon" width={22} height={27}/>
        <h2 className="text-[1.6rem] font-bold flex-1">Doc Name</h2>
        <button>
          <Image src="/icons/download.svg" alt="download icon" width={14} height={14}/>
        </button>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[1rem] text-black text-opacity-50 pl-[3.6rem]">01/07/2022</p>
        <p className="text-black text-[1.2rem]">10</p>
      </div>
    </div>
  )
}

export default FileComponent