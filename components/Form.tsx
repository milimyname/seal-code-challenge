import { useState, MouseEvent, ChangeEvent} from "react";

const Form = () => {
  const [file, SetFile] = useState<FileList | null>(null);
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);

  // Handle file change 
  const handleUploadOnChange = (e : ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }
    // Update File
    SetFile(fileInput.files);
  
    // For clearing input
    setInputElement(fileInput);
  };

  const handleUploadOnSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if(!file) return alert('No file was chosen');
    
    try{
    // Upload file
    let formData = new FormData();
    for (let i = 0; i < file.length; ++i) {
      formData.append('media', file[i])
    }
    // Send file
    await fetch('/api/upload', {
      method: "POST",
      body: formData
    })

  } catch (error) {
    // Handle error
    console.error(error);
    alert("Sorry! something went wrong.");
  }

  // Clear input
  if(inputElement !== null) inputElement.value = "";
  document.location.reload();
  }
  // Add a btn to delete all files
  // const handleDeleteAllFiles = async (e: MouseEvent<HTMLButtonElement>) =>{
  //   e.preventDefault();
  //   alert('Deleted all files');
  //   await fetch('/api/upload', {
  //     method: "DELETE",
  //   })
  // }

  return (
    <form action="/api/form" method="post" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-0" encType="multipart/form-data">
      <input type="file" name="doc" id='doc'
             className="block w-full text-lg text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-lg file:font-semibold file:bg-[#084261] file:text-[#74d8ff] file:transition-colors ease-in  hover:file:bg-[#2281b4]" 
             accept="image/*, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf" 
             onChange={handleUploadOnChange} multiple/>
      <button type="submit" className="text-2xl text-white bg-[#2386C9] rounded-lg px-12 py-4 transition hover:translate-y-1" onClick={handleUploadOnSubmit}>Upload</button>
      {/* <button type="submit" className="text-2xl text-white bg-[#2386C9] rounded-lg px-12 py-4 transition hover:translate-y-1" onClick={handleDeleteAllFiles}>Delete</button> */}
    </form>
  )
}

export default Form