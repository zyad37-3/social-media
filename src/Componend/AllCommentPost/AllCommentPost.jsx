import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Looding from '../Looding/Looding'
import CardPost from '../CardPost/CardPost'

export default function AllCommentPost() {
    const { id } = useParams()
    function commends() {

        return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
        })

    }

    const { data, isLoading, isError, error, isFetched } = useQuery({
        queryKey: ["getcommentpost",id],
        queryFn: commends,

    })









    
    console.log(data?.data.data.post);
    if (isLoading) {

        return <Looding/>


    }
    if (isError) {
        return <p>is error try new game</p>
    }

    return (
       <CardPost post={data?.data.data.post} AllCommentPost/>
    )
}
