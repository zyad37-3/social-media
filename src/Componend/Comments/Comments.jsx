import { CardFooter, Image } from '@heroui/react'
import React, { useState } from 'react'

export default function Comments({ topComment }) {


    return <>
        <CardFooter className='my-2  w-[90%] mx-auto'>
            <img
                alt="heroui logo"
                height={40}
                radius="sm"
                src={topComment.commentCreator.photo||"/images.png"}
                width={40}
                onError={(e) => {
                    e.currentTarget.src = "/images.png";
                }}

            />
            <div className="flex flex-col ms-3">
                <p className="text-md">{topComment.commentCreator.name}</p>
                <p className="text-small text-default-500">{topComment.content}</p>
            </div>

        </CardFooter>

    </>


}
