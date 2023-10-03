import React from "react";



export default function Jcard ({data}){

    return (
        <>
            <div className="flex">
                <div className="bg-slate-200 w-24 h-24 flex-shrink-0">
                    <img src={data.img} alt="alt" />
                </div>
                <div className="text-xs p-1 px-4">
                    <p className=" font-extrabold">{data.country}</p>
                    <p className="text-lg font-bold">{data.location}</p>
                    <p className="text-[10px] italic">dates</p>
                    <p className=" text-[10px] ">Lorem ipsum dolor sit amet consectetur adipisicing
                        voluptates molestias aut dolorem est quod magni
                    </p>
                </div>    
            </div>        
        </>
    )
}