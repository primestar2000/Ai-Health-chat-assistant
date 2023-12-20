import React from "react";

const  FlashMessage =  ({message}) => (
    <>
    <div className="bg-slate-300 w-fit self-center h-10 flex items-center p-2 rounded-[20px] text-[10px]">
        {`voice  ${message}  selected`}
    </div>
    </>
)

export default FlashMessage;

