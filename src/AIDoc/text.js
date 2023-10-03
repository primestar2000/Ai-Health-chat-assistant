
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '../assets/images/bgImage.jpg';
import Logo from '../assets/images/logo.png';
import './helper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import ChatReceiver from "../components/ChatReceiver";
import ChatSender from "../components/ChatSender";
import OpenAI from 'openai';




export default function AiDoc(){
    const [inputValue, setInputVal ] = useState('');
    const [chat, setChat] = useState([]);

// useEffect(()=>{
//     setChat([...chat, { role: 'system', content: 'this conversation is strictly based on medicals and health' }])
// },[])

    function HandleInputChange (event) {
        setInputVal(event.target.value)
    }
    function HandleSendMessage () {
        //adding <ChatSender /> to the chat array declared in chat useState any time the button is clicked
        if(inputValue){
            // setChat([...chat, <ChatSender key={inputValue} message={inputValue} />]);
            setChat([...chat, { role: 'user', content: inputValue }])
        }
        //clear the input value
        setInputVal('')
    }

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        

        const openai = new OpenAI({
            apiKey: import.meta.env.VITE_API_KEY,
            dangerouslyAllowBrowser: true
          });
        async function fetchData() {
        // const chatCompletion = await openai.chat.completions.create({
        //     messages: chat,
        //     model: 'gpt-3.5-turbo',
        // });
        // setChat([...chat, { role: 'assistant', content: chatCompletion.choices[0].message.content }])
        // console.log(chatCompletion.choices[0].message.content);
            console.log(true);
        }
    fetchData();
    return () => {
        // Cancel the request when the component unmounts
        controller.abort();
      };
    },[chat])


    return (
        <div style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            }} 
            className="h-screen relative"
            >
                <div className="bg-black/50 h-full w-full absolute flex justify-center ">

                        <div className="relative flex flex-col border-gradient max-w-sm w-full h-[90vh] mt-10 border-[2px] border-violet-500 border-solid"
                        
                        >
                            <div className="bg-black p-2 text-lg flex justify-start gap-3 items-center text-white">
                             <img className='h-[50px]' src={Logo} />
                                <span className='font-bold text-2xl text-blue-600'>Medi<span className='text-orange-400'>ChatPro</span></span>
                            </div>
                            {/* CHAT SPACE */}

                            <div className="h-full overflow-y-scroll">
                                {/* chat */}
                                <div className="h-[400px] p-2">
                                    
                                    {
                                       chat.map((message, index) => (
                                        message.role != "system" &&
                                            (message.role == 'user'? 
                                                <ChatSender key={index} message={message.content} /> 
                                                :
                                                <ChatReceiver key={index} message={message.content} />)
                                      ))
                                    }
                                    <p>{inputValue}</p>
                                </div>
                                
                            </div>

                            {/* BOTTOM PART INPUT AND BUTTON */}
                            <div className="w-[90%]   m-3  text-white flex gap-2 justify-between items-center border-[2px] rounded-3xl border-violet-500 border-solid">
                                <input 
                                onChange={HandleInputChange}
                                className="w-full p-2 text-xs bg-transparent outline-none" 
                                placeholder="message"
                                value={inputValue}
                                />
                                <div onClick={HandleSendMessage} className="w-[50px] h-[40px] bg-violet-500 rounded-full flex justify-center items-center">
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-white" /> 
                                </div>
                            </div>
                        </div>
                     
                </div>
        </div>
    )
}