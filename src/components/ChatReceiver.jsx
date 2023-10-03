import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from "@fortawesome/free-solid-svg-icons";


export default function ChatReceiver (props) {
    return ( 
    <div>
        <div className="w-[30px] h-[30px] flex justify-center items-center  rounded-full border-[2px] border-solid border-violet-500">
        <FontAwesomeIcon icon={faRobot} size="sm" color="white "/>
        </div>
        <div className="text-[10px] p-2 m-1 rounded-3xl rounded-tl max-w-[250px] bg-slate-100 text-black">
            {props.message}
        </div>
    </div>
    );
}

