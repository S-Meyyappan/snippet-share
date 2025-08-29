import { useState } from "react"
import axios from "axios"

import {useMutation, useQueryClient } from "@tanstack/react-query";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

import Tags from "../components/tags"
import Toggle from "../components/toggle";

function Add(){

    const path = import.meta.env.VITE_API_URL;

    const languages = [
        { id: 1, name: 'Plain Text', value: 'text' },
        { id: 2, name: 'JavaScript', value: 'javascript' },
        { id: 3, name: 'Html', value: 'html' },
        { id: 4, name: 'Python', value: 'python' },
        { id: 5, name: 'Java', value: 'java' },
        { id: 6, name: 'C++', value: 'cpp' },
        { id: 7, name: 'C#', value: 'csharp' },
        { id: 8, name: 'Go', value: 'go' },
        { id: 9, name: 'Rust', value: 'rust' },
        { id: 10, name: 'TypeScript', value: 'typescript' },
        { id: 11, name: 'CSS', value: 'css' },
        { id: 12, name: 'JSON', value: 'json' },
        { id: 13, name: 'Markdown', value: 'markdown' },
        ]
    const [selected, setSelected] = useState(languages[0])
    const queryclient=useQueryClient()

    const [isPublic, setIsPublic] = useState(true);
    const [formdata,setformData]=useState(
        {
            title:"",
            description:"",
            language:"",
            visibility:true,
            tags:[],
            file:[]
        }
    );

    const mutation=useMutation({
        mutationFn:async (newSubmission)=>{
            return axios.post(`${path}/submissions`,newSubmission,{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("Token")}`
              }
            })
        },
        onSuccess:()=>{
            queryclient.invalidateQueries(["submissions"])
            alert("Submitted Successfully")
        },
        onError: () => {
            console.error("Submission error:", error.response?.data || error.message);
            alert("Unable to Submit");
        }
    })

    const handleChange=(e)=>{
        const {name,value,files}=e.target
        if(files)
        {
            setformData((prev)=>({
                ...prev,
                [name]:[...(prev[name]||[]),...Array.from(files)]
            }))
        }
        else{
            setformData((prev)=>(
                {...prev,
                [name]:value
            }
            ))
        }
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(formdata.title=="")
        {
          return alert("Please enter a title")
        }
        
        const base64files=await Promise.all(formdata.file.map(async file=>{
            const name= file.name; 
            const ext= file.name.split('.').pop();
            const base64string =await filetoBase64(file)
            const [prefix, data] = base64string.split(",");
            const mime = prefix.match(/data:(.*);base64/)[1];
            return { name,ext,mime,data };
        }))
        
        const tagValues = Array.isArray(formdata.tags) ? formdata.tags.map((tag) => tag.value) : [];

        const newSubmission={
            title:formdata.title,
            description:formdata.description,
            language:formdata.language,
            visibility:formdata.visibility,
            tags:tagValues,
            files:base64files
        }

        mutation.mutate(newSubmission)

        setformData({
            title:"",
            description:"",
            visibility:true,
            tags:[],
            file:[]
        })
    }

    const filetoBase64=(file)=>{
        return new Promise((resolve,reject)=>{
            const reader=new FileReader()
            reader.readAsDataURL(file)
            reader.onload=()=>resolve(reader.result)
            reader.onerror=reject
        });
    };

    return(
        <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-xl border border-white/10 bg-white/10 dark:bg-black/40 backdrop-blur-md p-8 sm:p-12 space-y-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-white bg-clip-text ">
          Upload Details
        </h1>

        {/* Title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-200 dark:text-gray-100">
            Enter Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formdata.title}
            onChange={handleChange}
            placeholder="Enter title for the snippet"
            className="rounded-md bg-[#1f2937] dark:bg-[#111827] px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a36af]"
          />
        </div>

        {/* Language Selector */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-200 dark:text-gray-100">Select Language</label>
          <Listbox
            value={selected}
            onChange={(lang) => {
              setSelected(lang);
              setformData((prev) => ({ ...prev, language: lang.value }));
            }}
            >
            <div className="relative">
              <ListboxButton className="w-full cursor-default rounded-md bg-[#1f2937] dark:bg-[#111827] py-2 px-3 text-left text-white focus:outline-none focus:ring-2 focus:ring-[#0a36af]">
                <span className="block truncate">{selected.name}</span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-[#1f2937] dark:bg-[#111827] py-1 shadow-lg ring-1 ring-black/20">
                {languages.map((lang) => (
                  <ListboxOption
                    key={lang.id}
                    value={lang}
                    className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-white hover:bg-[#0d2161]"
                  >
                    <span
                      className={`block truncate ${
                        selected.value === lang.value ? 'font-semibold text-[#0a36af]' : 'font-normal'
                      }`}
                    >
                      {lang.name}
                    </span>

                    {selected.value === lang.value && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#d3d3d3]">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-200 dark:text-gray-100">
            Add Description
          </label>
          <textarea
            name="description"
            value={formdata.description}
            onChange={handleChange}
            placeholder="Paste your code here to share it"
            className="min-h-[100px] rounded-md bg-[#1f2937] dark:bg-[#111827] px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a36af]"
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-200 dark:text-gray-100">Upload Screenshot</label>
          <span className="text-sm font-small font-extralight text-gray-200 dark:text-gray-100 p-2">Add relative screenshots or code files. You can upload multiple files</span>
          <input
            type="file"
            name="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleChange}
            className="rounded-md bg-[#1f2937] dark:bg-[#111827] text-white file:mr-4 file:rounded-md file:border-0 file:bg-sky-800 file:px-4 file:py-2 file:text-white hover:file:bg-sky-700"
          />
          {formdata.file.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-gray-300">
            {formdata.file.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-[#1f2937] px-3 py-1 rounded-md"
              >
                <span>{file.name}</span>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 text-xs"
                  onClick={() =>
                    setformData((prev) => ({
                      ...prev,
                      file: prev.file.filter((_, i) => i !== index),
                    }))
                  }
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        </div>

        {/* Visibility Toggle */}
        <div className="flex-col justify-between">
          <div className="flex items-center">
          <span className="text-sm font-medium text-gray-200 dark:text-gray-100 p-2">
            {isPublic ? 'Public' : 'Private'}
          </span>
          <Toggle
              enabled={isPublic}
              onChange={(v) => {
                setIsPublic(v);
                setformData((prev) => ({ ...prev, visibility: v }));
              }}
          />
          </div>
          <span className="text-sm font-extralight text-gray-200 dark:text-gray-100 p-2">
            {isPublic ? 'Note : The content will be public and shareable to anyone' : 'Note : Hidden and available to you only'}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-col space-y-2 text-white">
          <label htmlFor="tags" className="text-sm font-medium text-gray-200 dark:text-gray-100">
            Add Suitable Tags
          </label>
          <Tags
            name="tags"
            placeholder="Add tags..."
            onChange={(newTags) => setformData((prev) => ({ ...prev, tags: newTags || [] }))}
          />
          <span className="text-sm font-small font-extralight text-gray-200 dark:text-gray-100 p-2">Add multiple tags by typing and pressing enter </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-2 font-semibold text-white shadow-md transition hover:from-sky-500 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-[#dde0e8]"
        >
          Submit
        </button>
      </form>
    </div>
    </>
    )
}

export default Add