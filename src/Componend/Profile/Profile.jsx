import { Avatar,  Card,  CardHeader } from '@heroui/react';
import axios from 'axios'
import React, { useState } from 'react'

export default function Profile() {
  const [user, setuser] = useState(null)
  const [email, setemail] = useState(null)
  const [img, setimg] = useState(null)
  async function profiledata(){
    
   const {data}=await axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("userToken")}`
      }
    })
    console.log(data.data);
    setuser(data.data.user.name)
    setemail(data.data.user.email)
    setimg(data.data.user.photo)
  }


profiledata()
  


  return (
    <div >
      <div className='bg-red-400 flex justify-center h-[50%]'>
        <img  className='bg-red-300 w-full  bg-cover bg-center h-[300px] ' src={img} alt="" />
      </div>
      <div className='mt-3'>
        <Card className="max-w-85" >
         <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={img}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{user}</h4>
            <h5 className="text-small tracking-tight text-default-400">{email}</h5>
          </div>
        </div>
      </CardHeader>
       </Card>
      </div>
    </div>
  );

}
