import { Input } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaMessage } from "react-icons/fa6";
import React, { use, useRef } from 'react'
import { toast } from 'react-toastify';
import { RiMessage2Fill } from "react-icons/ri";
export const MailIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default function CreatComment({ postId }) {

    const myrunder = useQueryClient()
    const creatcom = useRef(null)


    function creatComment() {
        const creatcomment = {
            content: creatcom.current.value,

        }



        return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, creatcomment, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
    }

    const { isPending, mutate } = useMutation({
        mutationFn: creatComment,
        onSuccess: function (data) {
            console.log("on succes", data);
            myrunder.invalidateQueries(["getcommentpost", postId])
            creatcom.current.value = "",
            toast.success("succes masseg")
        },
        onError: function (error) {
            console.log("on errors", error);
            toast.error("error masseg")
        }
    })






    console.log();

    return <>
        {/* <div className='w-[90%] mx-auto flex gap-5'>
            <input ref={creatcom} type="text" className='bg-slate-200 w-full rounded-md p-1' />
           <button onClick={mutate} className='border bg-blue-400 px-4 py-1 rounded-md cursor-pointer'> {isPending?"loding":"done"}</button>
        </div> */}


        <Input
            ref={creatcom}


            labelPlacement="outside"
            placeholder="Enter your massage"
            endContent={
                <div >
                    <>{isPending ? <> <button disabled className='p-1 cursor-pointer' >
                        {/* <MailIcon className="text-2xl cursor-pointer   pointer-events-none shrink-0" /> */}
                       <RiMessage2Fill className="text-2xl cursor-pointer   pointer-events-none shrink-0"  />
                    </button>

                    </> : <>     <button onClick={mutate} className=' p-1  cursor-pointer'>
                        {/* <MailIcon className="text-2xl text-white   pointer-events-none shrink-0" /> */}
                         <FaMessage  className="text-2xl text-slate-600   pointer-events-none shrink-0"/>
                    </button>

                    </>}</>

                </div>
            }
            type="text"
        />


    </>
}
