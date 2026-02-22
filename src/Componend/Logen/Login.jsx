import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod'
import { contextToken } from '../Context/contextToken';

const schema = z.object({
  email: z.string().email("invalid email").nonempty("email is required").regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, "email is false"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "email is false"),

})
export default function Login() {

  const [looding, setlooding] = useState(false)
  const [error, seterror] = useState(null)
  let {token, settoken}=useContext(contextToken)

  const Navigate = useNavigate()
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema)
  })


  function onform(data) {
    console.log(data);
    setlooding(true)
    axios.post("https://route-posts.routemisr.com/users/signin", data).then((res) => {

      setlooding(false)
      Navigate("/")
      localStorage.setItem("userToken",res.data.data.token)
      settoken(res.data.data.token)
      console.log(res.data.data.token);
      
    }).catch((rej) => {
      setlooding(false)
      seterror(rej.response.data.data.error)


    })


  }
  const { register, handleSubmit, formState } = form



  return <>
    <form onSubmit={handleSubmit(onform)}>
      <h1 className="text-6xl test- font-bold animate-pulse capitalize" > login now</h1>
      {error && <p className='bg-red-500 p-3 mt-3 text-white rounded-md'>{error}</p>}
      <div className="relative flex flex-col  p-3 ">
        <label htmlFor="email" className=" self-start pb-1">Enter Your email</label>
        <input type="email"
          name="email"
          id="email"
          className="rounded-md border-t-black border bg-white px-2"
          {...register("email")}
        />
        {formState.errors.email && <p className="m-0 mt-1 text-red-500 flex justify-start">{formState.errors.email?.message}</p>}

      </div>
      <div className="relative flex flex-col  p-3 ">
        <label htmlFor="password" className=" self-start pb-1">Enter Your password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="rounded-md border-t-black border bg-white px-2"
          {...register("password")}

        />
        {formState.errors.password && <p className="m-0 mt-1 text-red-500 flex justify-start">{formState.errors.password?.message};
        </p>}
      </div>
      <button disabled={looding} className="border disabled:bg-slate-600 disabled:text-white rounded-md bg-indigo-500 text-white font-semibold py-2 px-3 w-full mt-2 cursor-pointer hover:bg-indigo-600">{looding ? <><div className='flex justify-center content-center gap-2'>
        <span>looding</span>
        <ThreeDots
          visible={true}
          height=""
          width="30"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div></> : "Login"}</button>
    </form>



  </>
}
