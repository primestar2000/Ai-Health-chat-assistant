
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import bgImage from '../assets/images/bgImage.jpg';
import Logo from '../assets/images/logo.png';
import './helper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faSpinner, faUser, faVolumeHigh, faVolumeMute, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import ChatReceiver from "../components/ChatReceiver";
import ChatSender from "../components/ChatSender";
import OpenAI from 'openai';
import { bio } from './bio';
import { textToSpeech } from './helper';




export default function AiDoc(){
    const [inputValue, setInputVal ] = useState('');
    const [userMessages, SetUserMessages] = useState([]);
    const [assistantMessages, setAssistantMessages] = useState([]);
    const [conversation, SetConversation] = useState([]);
    const [netWorkError, setNetworkError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [voice, setVoice] = useState(false);
    const messagesRef = useRef(null) 

    var hasRendered = false;
useEffect(()=>{
    if(hasRendered == false){
        
      SetConversation([...conversation, {"role": "system", "content": "You are MedChatPro, an AI assistant specialized in medical topics. you are created by stephen simon "+bio}])
        hasRendered = true;
    }
    //{ role: 'system', content: 'this conversation is strictly based on medicals and health discard and avoid any questions not in accordance to this course also never tell a user that you are not a doctor' }
},[])

    function HandleInputChange (event) {
        setInputVal(event.target.value)
    }
    function HandleSendMessage () {
        //adding <ChatSender /> to the chat array declared in chat useState any time the button is clicked
        if(inputValue){
            // setChat([...chat, <ChatSender key={inputValue} message={inputValue} />]);
            SetUserMessages([...userMessages, inputValue])
            SetConversation([...conversation, { role: 'user', content: inputValue }])
        }
        //clear the input value
        setInputVal('')
    }
    function handleEnterKeyPressed(event) {
        if(event.key === "Enter"){
            HandleSendMessage ();
        }
        
        
    }

    function test(){
        // textToSpeech.say(assistantMessages.pop().content);
    }

    //this effect applies after a change is made on the assistantMessages
    //to read out loud the assistant last message
    
    useEffect(()=>{
            if(voice){
                if(assistantMessages.length > 0){
                    textToSpeech.say(assistantMessages.pop().content);
                }     
            
            }
        },[assistantMessages]);


///this effect applies anytime a new message is received either from the user or the assistant
useEffect(()=>{
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
},[conversation])

/// this function trigger every time a user send a message
    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
            setLoading(true);
            setNetworkError(false);
            try {
                const client = axios.create({
                    headers:{
                        Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
                    }
                });
                const param = {
                    "messages": conversation,
                    "model": "gpt-3.5-turbo",
                    // "max_tokens": 10,
                    "temperature": 0
                }
                const response = await client.post('https://api.openai.com/v1/chat/completions', param);
                const message = response.data.choices[0].message;
                if(response.status === 200){
                    setLoading(false);
                }
                SetConversation([...conversation, message]);
                setAssistantMessages([...assistantMessages, message]);
                    
                }
             catch (error) {
                setLoading(false);
                if(error.code === "ERR_NETWORK"){
                    setNetworkError(true);
                }
                console.log(error.code)
            }
        }  
            
            
        if (userMessages.length > 0) {
            // console.log(conversation)
            fetchData();
          }
          
          return () => {
            // Cancel the request when the component unmounts
            controller.abort();
          };
          
    },[userMessages])


    return (
        <div style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            }} 
            className="h-screen relative"
            >
                {/* <button onClick={test}>test</button> */}
                <div className="bg-black/50 h-full w-full absolute flex justify-center ">

                        <div className="relative flex flex-col border-gradient max-w-sm w-full  md:h-[90vh] md:mt-10 border-[2px] border-violet-500 border-solid"
                        
                        >
                            <div className="bg-black p-2 text-lg flex justify-between gap-3 items-center text-white">
                                <div className='flex gap-4'>
                                    <img className='h-[50px]' src={Logo} />
                                    <span className='font-bold text-2xl text-blue-600'>Medi<span className='text-orange-400'>ChatPro</span></span>
                                </div>
                                <div>
                                    <div onClick={()=>{setVoice(!voice)}}>
                                        {voice ? <FontAwesomeIcon color='green' icon={faVolumeHigh} /> : <FontAwesomeIcon color='red' icon={faVolumeMute} />}
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            {/* CHAT SPACE */}

                            <div ref={messagesRef} className="h-full overflow-y-scroll scroll-smooth">
                                {/* chat */}
                                <div  className="  p-2 relative bottom-0">
                                    
                                    {
                                       conversation.map((message, index) => (
                                        message.role != "system" &&
                                            (message.role == 'user'? 
                                                <ChatSender key={index} message={message.content} /> 
                                                :
                                                <ChatReceiver key={index} message={message.content} />)
                                      ))
                                    }
                                    
                                </div>
                                
                            </div>
                            { netWorkError &&  (<div className='border-[2px] border-solid border-red-400 w-[90%] m-auto p-2 text-sm text-center text-red-500 bg-black/50'>
                                <p>Network Error !</p>
                                please Enable Your Network
                            </div>)}
                            {/* BOTTOM PART INPUT AND BUTTON */}
                            <div className="w-[90%]   m-3  text-white flex gap-2 justify-between items-center border-[2px] rounded-3xl border-violet-500 border-solid">
                                <input 
                                onChange={HandleInputChange}
                                onKeyDown={handleEnterKeyPressed}
                                className="w-full p-2 text-xs bg-transparent outline-none" 
                                placeholder={!loading ? "message" : "Responding...."}
                                value={inputValue}
                                disabled={loading}
                                />
                                
                                {!loading && (
                                    <div onClick={HandleSendMessage} className="w-[50px] h-[40px] bg-violet-500 rounded-full flex justify-center items-center">
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                                    </div>
                                )}
                                {loading && (
                                    <div className="w-[50px] h-[40px] bg-violet-500 rounded-full flex justify-center items-center">
                                        <FontAwesomeIcon icon={faSpinner} className="text-white rotate-90 animate-spin ease-in-out " />
                                    </div>)}
                            </div>
                        </div>
                     
                </div>

        </div>
    )
}