
const Form = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const target = e.target as HTMLFormElement;
    // // Get data from the form.
    // const data = {
    //   name: target.doc.value,
    // }

    // Send the data to the server in JSON format.
    // const JSONdata = JSON.stringify(data)

    // Form the request for sending data to the server.
    // const options = {
    //   // The method is POST because we are sending data.
    //   method: 'POST',
    //   // Tell the server we're sending JSON.
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   // Body of the request is the JSON data we created above.
    //   body: JSONdata,
    // }

    // Send the form data to our forms API on Vercel and get a response.
    // const response = await fetch('/api/form', options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    // const result = await response.json()
    // console.log(result)
    // alert(`Is this your full name: ${result.doc}`)
  }

  return (
    <form action="/api/form" method="post" onSubmit={handleSubmit} className="flex justify-between items-center gap-12" encType="multipart/form-data">
      <input type="file" name="doc" id='doc'
             className="block w-full text-lg text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-lg file:font-semibold file:bg-[#084261] file:text-[#74d8ff] file:transition-colors ease-in  hover:file:bg-[#2281b4]" 
             accept="image/*, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf" multiple/>
      <button type="submit" className="text-2xl text-white bg-[#2386C9] rounded-lg px-12 py-4 transition hover:translate-y-1">Upload</button>
    </form>
  )
}

export default Form