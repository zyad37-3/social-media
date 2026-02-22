



import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
export default function Editepostprovider({ isOpen, onClose, refetch, id, post }) {



  const getinputtext = useRef(null)
  const getinputfile = useRef(null)
  const [showimg, setshowimg] = useState(null)
  const [text, setText] = useState(post?.body || "");
  const [showImg, setShowImg] = useState(post?.image || null);
const fileRef = useRef(null);
  async function creatPostone() {
   

    const fromdata = new FormData()
    if (text.trim()) {
      fromdata.append("body", text);
    } if (fileRef.current.files.length > 0) {
  fromdata.append("image", fileRef.current.files[0]);
}


    const { data } = await axios.put(`https://route-posts.routemisr.com/posts/${id}`, fromdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
    console.log(data);
    console.log(data.success);



 if (data.success) {
        toast.success("Post updated successfully");
        refetch?.();
        onClose();
      } else {
        toast.error("Error updating post");
      }
















  }





  function getimgprofileshow() {
    const imgfile = getinputfile.current.files[0]
    const imgurl = URL.createObjectURL(imgfile)
    console.log(imgurl);
    setshowimg(imgurl)
  }
  function closeimg() {
    setshowimg(null)
    getinputfile.current.value = ""
  }
  return (
    <>

     

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={5}
                  className="p-3 rounded-md border"
                  placeholder="Edit your post"
                />

                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  id="fileinput"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setShowImg(URL.createObjectURL(file));
                    }
                  }}
                />
                <label htmlFor="fileinput" className=" rounded-md py-2 px-3 w-fit bg-slate-300 hover:bg-slate-400">creat file</label>
                {showImg && (
                  <div className="relative mt-3">
                    <img src={showImg} alt="" className="rounded-md" />

                    <button
                      onClick={() => {
                        setShowImg(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7"
                    >
                      ×
                    </button>
                  </div>
                )}

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={() => creatPostone()}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

