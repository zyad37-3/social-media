
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

export default function CreatPost({refetch}) {

    const getinputtext = useRef(null)
    const getinputfile = useRef(null)
    const [showimg, setshowimg] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    async function creatPostone() {
        console.log(getinputtext.current.value);
        console.log(getinputfile.current.files);

        const fromdata = new FormData()
        if (getinputtext.current.value) {
            fromdata.append("body", getinputtext.current.value)
        } if (getinputfile.current.files.length > 0) {
            fromdata.append("image", getinputfile.current.files[0])

        }


        const { data } =await axios.post(`https://route-posts.routemisr.com/posts`, fromdata, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        console.log(data);
          console.log(data.success);
          
        if (data.success){
            
            getinputtext.current.value=""
            closeimg()
            onOpenChange(false)
            refetch()
            toast.success("success post")
        }else{
            toast.error("error post")
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

            <Button className="mb-2 w-[50%]" onPress={onOpen}>what is your mind</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <textarea ref={getinputtext} name="" id="" rows={5} className="p-3 rounded-md border" placeholder="Enter your post"></textarea>

                                <input ref={getinputfile} onChange={getimgprofileshow} type="file" className="hidden" id="fileinput" />
                                <label htmlFor="fileinput" className=" rounded-md py-2 px-3 w-fit bg-slate-300 hover:bg-slate-400">creat file</label>
                                {showimg && <div onClick={closeimg} className="relative">
                                    <div className=" bg-slate-100 hover:bg-red-500 absolute top-3 rounded-full right-3 flex justify-center items-end">

                                        <button className=" w-9 h-8 text-[20px] text-black hover:text-white">x</button>
                                    </div>
                                    <img src={showimg} alt="" />
                                </div>
                                }

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={() => creatPostone()}>
                                    add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
