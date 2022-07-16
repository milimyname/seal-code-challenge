import { useState, MouseEvent, ChangeEvent} from "react";
import {storage} from "../firebase/initFirebase"
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

const Form = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const firebaseUrl: string[] =[];
  const fileName: string[] =[];

  // Handle file change 
  const handleUploadOnChange = (e : ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files;

    if (!fileInput) {
      alert("No file was chosen");
      return;
    }
    // Update File
    setFile(fileInput);
  
  };

  const handleUploadOnSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if(!file) return alert('No file was chosen');

    // Upload file to firebase and get a new link
    for(let i = 0; i < file.length; i++) {
      const storagRef = ref(storage, `files/${file[i].name.split('.')[0]}-${Math.floor(Math.random() * 1000) + 1}` );
      const uploadedFile = await uploadBytesResumable(storagRef, file[i]);
      const newUrl = await getDownloadURL(uploadedFile.ref);
      firebaseUrl.push(newUrl);
      fileName.push(file[i].name);
    }
    
    
    try{

    // Send file
    await fetch('/api/upload', {
      method: "POST",
      body: JSON.stringify({
        name: fileName,
        url: firebaseUrl
      }), 
      headers:{
        'Content-Type': 'application/json'
      }
    })

    } catch (error) {
      // Handle error
      console.error(error);
      alert("Sorry! something went wrong.");
    }

    document.location.reload();
  }


  return (
    <form action="/api/form" method="post" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-0" encType="multipart/form-data">
      <input type="file" name="doc" id='doc'
             className="block w-full text-lg text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-lg file:font-semibold file:bg-[#084261] file:text-[#74d8ff] file:transition-colors ease-in  hover:file:bg-[#2281b4]" 
             accept="image/*, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf" 
             onChange={handleUploadOnChange} multiple/>
      <button type="submit" className="text-2xl text-white bg-[#2386C9] rounded-lg px-12 py-4 transition hover:translate-y-1 sm:text-xl sm:px-8 sm:py-2" onClick={handleUploadOnSubmit}>Upload</button>
    </form>
  )
}

export default Form