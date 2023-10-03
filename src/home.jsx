import React from "react";

export default function Home (){

    return(
        <div className="flex px-3 py-1 items-center justify-between bg-violet-500 text-white">
            <h1 className="text-white text-xl">My Goods</h1>
            <input
            className="w-[300px] outline-none p-1 px-2 text-sm  text-black rounded-3xl" 
            placeholder="search"
            />
            <button className="bg-blue-500 px-4 py-2">Add</button>

        </div>
    )
}