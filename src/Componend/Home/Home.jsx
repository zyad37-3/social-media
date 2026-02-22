import React, { useContext, useEffect, useState } from 'react'
import { contextToken } from '../Context/contextToken'
import axios from 'axios'
import Login from '../Logen/Login'
import CardPost from '../CardPost/CardPost'
import Looding from '../Looding/Looding'
import { useQuery } from '@tanstack/react-query'
import CreatPost from '../CreatPost/CreatPost'

export default function Home() {

  // const [posts, setallposts] = useState(null)
  // const [looding, setlooding] = useState(true)
  // const [error, seterror] = useState(false)
  let { token } = useContext(contextToken)

  function allposts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers: {
        Authorization: `Bearer ${token}`

      },
      params:{
        sort:"createdAt"
      }




    // }).then((res) => {
    //   console.log(res.data.data.posts);
    //   setallposts(res.data.data.posts)
    //   setlooding(false)

    // }).catch((rej) => {
    //   console.log(rej);
    //   setlooding(false)
    //   useState(true)
    // 
    }
    )
  }
  const {data,isLoading,isError,error,isFetched,refetch } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: allposts,
    
  })
  console.log(data?.data.data.posts);

  // useEffect(() => {
  //   if (token) {

  //     allposts()
  //   }
  // }, [token])
  
  if (isLoading) {
    
    return <Looding />
    
    
  }
  if (isError) {
    return <p>is error try new game</p>
  }
  return <>
<CreatPost refetch={refetch}/>
    {data?.data.data.posts.map((post) =>

      <CardPost key={post.id} post={post} />



    )}

  </>


}
