import React from 'react';


export default function Faq({SendFaq, text}){

    function SendData(){
        
         SendFaq(text);
    }

    return (
        <div onClick={SendData} className='p-1 flex-auto m-1 text-center cursor-pointer border-[2px] border-solid border-violet-500 w-fit'>
            {text}
        </div>
    )
}