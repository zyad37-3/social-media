import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import { useContext, useState } from "react";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CreatComment from "../CreatComment/CreatComment";
import { HiDotsHorizontal } from "react-icons/hi";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { contextToken } from "../Context/contextToken";
import { toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import Editepostprovider from './../Editpost/Editepost';
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

export default function CardPost({ post, AllCommentPost = false }) {

  const [openEdit, setOpenEdit] = useState(false);



  const query = useQueryClient()
  const { tokenyouserid } = useContext(contextToken)
  const { body, user, createdAt, image, topComment, id } = post
  const { name, username, email, photo, _id } = user
  if (!image && !body) { return }
console.log();

  function getallcommens() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
  }

  const { data } = useQuery({
    queryKey: ["getcommensss"],
    queryFn: getallcommens,
    enabled: AllCommentPost,
  })


  async function fnDeletPost() {
    const { data } = await axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
    if (data.success) {
      toast.success("delet post")
      query.invalidateQueries("getAllPosts")
    }
    else {
      toast.error("error delet")
    }

    console.log(data);

  }









  console.log(post);

  return <>

    <Card className="max-w-125 m-auto mb-6">
      <CardHeader className="flex justify-between ">
        <div className="flex gap-3">
          <img
            alt="heroui logo"
            height={40}
            radius="sm"
            src={photo || "/images.png"}
            width={40}
            onError={(e) => {
              e.currentTarget.src = "/images.png";
            }}

          />
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">{new Date(createdAt).toLocaleDateString()}


            </p>
          </div>

        </div>

        {_id === tokenyouserid && <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant=""><HiDotsHorizontal /></Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">

              <DropdownItem onClick={() => setOpenEdit(true)} key="edit">Edit file</DropdownItem>
              <DropdownItem onClick={() => fnDeletPost()} key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        }



      </CardHeader>
      <Divider />
      <CardBody>
        <div>

          {body && <p className="mb-3">{body}</p>}
          {image && <img src={image} alt="" />}

        </div>

      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full flex justify-between">
          <div className=" flex items-center gap-1 cursor-pointer hover:bg-slate-200 p-1 w-25">{post.likesCount!==0&&post.likesCount}<AiOutlineLike className="text-[25px]" /> like</div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-200 p-1  w-fit  " > <Link className="flex items-center gap-1" to={`/AllCommentPost/${id}`} >{post.commentsCount!==0&&post.commentsCount} <FaCommentDots className="text-[20px] " /> comment</Link></div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-200 p-1  w-25"><FaShare /> share</div>
        </div>
      </CardFooter>
      <CardFooter>
        <CreatComment postId={id} />
      </CardFooter>
      {AllCommentPost === false && topComment && <Comments topComment={topComment} />}
      {AllCommentPost && data?.data.data.comments.map((comments) => <Comments topComment={comments} />)}
    </Card>

    <Editepostprovider id={id}
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
      post={post}
      refetch={() => query.invalidateQueries("getAllPosts")}
    />
  </>;
}
