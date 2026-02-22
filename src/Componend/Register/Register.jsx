import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

const schema = z.object({
    name: z.string().min(3, "min is 3").max(20, "max is 20").nonempty("name is required"),
    email: z.string().email("invalid email").nonempty("email is required").regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, "email is false"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "email is false"),
    rePassword: z.string(),
    dateOfBirth: z.string().refine((data) => {
        const datauser = new Date(data).getFullYear()
        const currentdata = new Date().getFullYear()


        if (currentdata - datauser >= 10) {
            return true
        } else {
            return false
        }
    }, "invalid data..."),
    gender: z.enum(["male", "female"])
}).refine(({ password, rePassword }) => {
    if (password === rePassword) {
        return true
    } else {
        return false
    }

}, { errors: "password && rePassword is matched!!", path: ["rePassword"] }
)




export default function Register() {
    const navigate = useNavigate()
    const [error, seterror] = useState(null)
    const [looding, setlooding] = useState(false)
const [success, setsuccess] = useState(null)
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: ""
        },
        resolver: zodResolver(schema),
        mode: 'onChange',

    })

    const { register, handleSubmit, formState } = form

    function change(data) {
        setlooding(true)
        console.log(data);
        let x = axios.post('https://route-posts.routemisr.com/users/signup', data)
            .then((res) => {
                setTimeout(() => {
                    navigate("/login")
                     setlooding(false)
                     
                     
                }, 1000);
                    setsuccess(res.data.message)
              

                




            })
            .catch((rej) => {
                seterror(rej.response.data.error)
                console.log(rej.response.data.error);
                setlooding(false)
            })


    }


    return <>

        <h1 className="text-6xl font-bold animate-bounce">Register Now</h1>
        
        {looding===true?<>{success && <p className='bg-green-400 p-3 mt-3 text-white rounded-md'>{success}</p>}</>:<>{error && <p className='bg-red-500 p-3 mt-3 text-white rounded-md'>{error}</p>}</>}
        
        <form onSubmit={handleSubmit(change)} className='mt-5' >
            <div className="relative flex flex-col  p-3 ">
                <label htmlFor="name" className=" self-start pb-1">Enter Your name</label>
                <input type="text" id='name' name='name'
                    {...register("name")
                    //     {
                    //     required: { value: true, message: "plese your name" },
                    //     minLength: { value: 3, message: "chick your name" },
                    //     maxLength: { value: 10, message: "your name max 10" }
                    // })
                    }
                    placeholder='Enter Your name' className="rounded-md border-t-black border bg-white px-2" />

                {formState.errors.name && formState.touchedFields.name && <p className="m-0 mt-1 text-red-500 flex justify-start">{formState.errors.name?.message}</p>}
            </div>
            <div className="relative flex flex-col p-2 ">
                <label htmlFor="email" className=" self-start pb-1">Enter Your email</label>
                <input type="email" id='email' name='email' {...register("email")
                    // , {
                    //     pattern: { value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, message: "correct your email" }
                    // })
                }
                    placeholder='Enter Your email' className="rounded-md border-t-black border bg-white px-2" />
                {formState.errors.email && <p className="m-0 mt-1 text-red-500 flex justify-start">{formState.errors.email?.message} </p>}
            </div>
            <div className="relative flex flex-col p-2 ">
                <label htmlFor="password" className=" self-start pb-1">Enter Your password</label>
                <input type="password" id='password' name='password' {...register("password")
                    // , {
                    //     pattern: { value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/, message: "enter your password" }
                    // })
                } placeholder='Enter Your password' className="rounded-md border-t-black border bg-white px-2" />
                {formState.errors.password && <p className="m-0 mt-1 text-red-500 flex justify-start">{formState.errors.password?.message} </p>}

            </div>
            <div className="relative flex flex-col p-2 ">
                <label htmlFor="rePassword" className=" self-start pb-1">Enter Your rePassword</label>
                <input type="password" id='rePassword' name='rePassword' {...register("rePassword")} placeholder='Enter Your rePassword' className="rounded-md border-t-black border bg-white px-2"
                    {...register("rePassword")
                    //     , {
                    //     validate: function (value) {
                    //         if (value === getValues("password")) {
                    //             return true
                    //         }
                    //         return "password && repassword not math !!"
                    //     }
                    // }

                    // )
                    }

                />
                {formState.errors.rePassword && <p className="m-0 mt-1 text-red-500 flex justify-start">{formState.errors.rePassword?.message} </p>}

            </div>
            <div className="relative flex flex-col p-2 ">
                <label htmlFor="dateOfBirth" className=" self-start pb-1">Enter Your birthday</label>
                <input type="date" id='dateOfBirth' name='dateOfBirth' {...register("dateOfBirth")
                    // , {
                    //     valueAsDate: true, validate: function (value) {
                    //         const currentdata = new Date().getFullYear()
                    //         const userdata = value.getFullYear()
                    //         if (currentdata - userdata >= 18) {
                    //             return true
                    //         } else {
                    //             return "should your data <=18"
                    //         }

                    //     }
                    // })
                } className="rounded-md border-t-black border bg-white px-2" />
                {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && <p className="m-0 mt-1 text-red-500 flex justify-start">{formState.errors.dateOfBirth?.message} </p>}
            </div>
            <div className="flex justify-center ">
                <div className=" p-3 ">
                    <input type="radio" id='male'  {...register("gender")} defaultValue="male" defaultChecked className="rounded-md border-t-black border px-2 " />
                    <label htmlFor="male" className="text-[20px] self-start pb-1">male</label>
                </div>
                <div className=" p-3 ">
                    <input type="radio" id='female'  {...register("gender")} defaultValue="female" defaultChecked className="rounded-md border-t-black border px-2 " />
                    <label htmlFor="female" className="text-[20px] self-start pb-1">female</label>
                </div>

            </div>
            <button disabled={looding} className="border disabled:bg-slate-600 disabled:text-white rounded-md bg-indigo-500 text-white font-semibold py-2 px-3 w-full mt-2 cursor-pointer hover:bg-indigo-600">{looding ? <><div className='flex justify-center content-center gap-2'>
                <span className=''>looding</span><ThreeDots
                    visible={true}
                    height=""
                    width="30"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div></> : "submit"}</button>
        </form>





    </>
}
