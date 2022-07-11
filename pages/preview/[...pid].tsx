import type { NextPage, } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router"
import { MouseEvent, useEffect, useState} from "react";


const Preview: NextPage = () => {
  const [link, setLink] = useState<string>('');
  const router = useRouter();
  const { pid } = router.query;
  const binaryData = [] as Array<string>;

  // Deactivate the link after a hour

  useEffect( ()=>{
    // setTimeout(() => {  
    //   console.log('adsad')
    //   URL.revokeObjectURL(link)
    // }, 1000 * 60 * 6
    // console.log(pid)
   }
  ,[])

  const previewFile = ()=>{
    if(!pid) return;

    if(pid[1].split('.')[1] === 'jpg' || pid[1].split('.')[1] === 'png' || pid[1].split('.')[1] === 'jpeg')
      return <Image src={`/uploads/${pid[0]}/${pid[1]}`} width={'100%'} height={'100%'} alt={`${pid[1].split('-')[0]}`} />
     else 
      return <iframe src={`/uploads/${pid[0]}/${pid[1]}`} width={`100%`} height={'680'}></iframe>
    
  }


  const handleCopyLink = async (e: MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    
    if(!pid) return;
    const {url} = await fetch(`${window.location.origin}/uploads/${pid[0]}/${pid[1]}`)
    binaryData.push(url)

    // Temporary link
    const link = URL.createObjectURL(new Blob(binaryData));
    await navigator.clipboard.writeText(link.slice(5,-1));
    alert(`Copied to clipboard`);
    setLink(link);
  }




  return (
    <div className='max-w-6xl mx-auto'>
      <Head>
        <title>SEAL Code Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='flex justify-between items-center pt-20'>
        <Link href='../'>
          <a className="text-2xl text-white bg-[#2386C9] rounded-lg px-12 py-4 transition hover:translate-y-1">
            Back
          </a>
        </Link>
        <div className='flex items-center gap-10'>
          <h1 className="text-4xl text-white">
            {pid && pid[1].split('-')[0]}
          </h1>
          <button className="text-2xl text-white bg-text rounded-lg px-12 py-4 cursor-pointer" onClick={handleCopyLink}>
            Share
          </button>
        </div>
      </header>

      <main className='pt-10'>
        {previewFile()}
      </main>

    </div>
  )
}

export default Preview