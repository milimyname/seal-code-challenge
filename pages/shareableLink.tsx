import { useRouter } from "next/router"
import {useEffect, useState} from "react";
import Image from "next/image";
import jwt from 'jsonwebtoken'


const ShareableLink = () => {
  const [tokenToVerify, setTokenToVerify] = useState<string | null>(null);
  const router = useRouter();
  const { FileId } = router.query as { FileId: string };
  
  useEffect(()=>{
    FileId && setTokenToVerify(FileId.split('tokenId=')[1]);
    tokenToVerify && jwt.verify(tokenToVerify, 'secret', async (err, decoded) => {
      if(err) router.push('/404');
    });
  },[tokenToVerify, FileId, router])

  const previewFile = ()=>{
    if(!FileId) return;

    if(FileId.split('.')[1] === 'jpg' || FileId.split('.')[1] === 'png' || FileId.split('.')[1] === 'jpeg')
      return <Image src={`/img/${FileId}`} width={'100%'} height={'100%'} alt={`${FileId.split('-')[0]}`} />
    else 
      return <iframe src={`../img/${FileId}`} width={`100%`} height={'100%'}></iframe>
    
  }

  return (
    <div className="w-screen h-screen overflow-visible">
    {previewFile()}
    </div>
  )
}

export default ShareableLink