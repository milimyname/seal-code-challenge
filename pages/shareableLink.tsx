import { useRouter } from "next/router"
import {useEffect, useState, useCallback} from "react";
import Image from "next/image";
import jwt from 'jsonwebtoken'


const ShareableLink = () => {
  const [tokenToVerify, setTokenToVerify] = useState<string | null>(null);
  const [doc, setDoc] = useState<{name : string[], url: string[]} | null>(null);
  const router = useRouter();
  const { tokenId, FileId } = router.query as { tokenId: string, FileId: string };


  const getDocById = useCallback(async () => {
    if(!FileId) return;
    const data = await (await fetch(`/api/getDoc/${FileId}`)).json();
    setDoc(data);
  }, [FileId]);
  
  useEffect(()=>{
    getDocById();
    tokenId && setTokenToVerify(tokenId.split('tokenId=')[1]);
    tokenToVerify && jwt.verify(tokenToVerify, 'secret', async (err, decoded) => {
      if(err) router.push('/404');
    });
  },[tokenToVerify, tokenId, router,getDocById])

  const previewFile = ()=>{
    if(!doc) return;

    if(doc.name[0].split('.')[1] === 'jpg' || doc.name[0].split('.')[1] === 'png' || doc.name[0].split('.')[1] === 'jpeg')
      return <Image src={doc.url[0]} width={'100%'} height={'100%'} alt={`${tokenId.split('.')[0]}`} />
    else 
      return <iframe src={doc.url[0]} width={`100%`} height={'100%'}></iframe>
    
  }

  return (
    <div className="w-screen h-screen overflow-visible">
    {previewFile()}
    </div>
  )
}

export default ShareableLink