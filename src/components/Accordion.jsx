import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faHome, faPaperPlane, faRobot, faToolbox, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Accordion ({children, title, iconVar}){

    const [accordion, setAccordion] = useState(false);
    function HandleClick (){
        setAccordion(!accordion);
    }

    return(
        <>
            <div onClick={HandleClick} className="p-2 text-sm rounded-md text-white/70 hover:bg-gray-200 hover:text-black w-full ">
                <div className='w-full flex justify-between'>
                    <div><FontAwesomeIcon icon={iconVar} /> {title}</div>
                    <div><FontAwesomeIcon icon={ !accordion ? faChevronDown : faChevronUp} /></div>
                    
                </div>
            </div>
            <div className='m-2 ml-6 text-sm'>
                    {accordion && children}
            </div>
        </>
    )
}