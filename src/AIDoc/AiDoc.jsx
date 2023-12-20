
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import bgImage from '../assets/images/bgImage.jpg';
import Logo from '../assets/images/logo.png';
import './helper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCancel, faChevronDown, faClose, faPaperPlane, faRobot, faSpinner, faUser, faVolumeHigh, faVolumeMute, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import ChatReceiver from "../components/ChatReceiver";
import ChatSender from "../components/ChatSender";
import OpenAI from 'openai';
import { bio, MedChatPro } from './chatgpt-config';
import { textToSpeech } from './helper';
import Faq from './Faq';
import { faqData } from './data';
import SubMenu from '../components/SubMenu';
import FlashMessage from '../components/FlashMessage';




export default function AiDoc(){
    const [inputValue, setInputVal ] = useState('');
    const [userMessages, SetUserMessages] = useState([]);
    const [assistantMessages, setAssistantMessages] = useState([]);
    const [conversation, SetConversation] = useState([]);
    const [netWorkError, setNetworkError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [voice, setVoice] = useState(true);
    const [aiVoice, setAiVoice] = useState(() =>( localStorage.getItem('aiVoice') || 0));
    const [aiLanguage, setAiLanguage] = useState(() =>( localStorage.getItem('aiLanguage') || 0));
    const [menuDisplay, setMenuDispaly] = useState(false);
    const [FlashContent, setFlashContent] = useState("");
    const messagesRef = useRef(null)  
    const flashBody = useRef(null)  
    var hasRendered = false;


useEffect(()=>{
    if(hasRendered == false){
        
      SetConversation([...conversation, {"role": "system", "content": "you are created by stephen simon" + `your replies or response should be through ${aiLanguage} language ` +  MedChatPro  + bio}])
        hasRendered = true;
    }
    //{ role: 'system', content: 'this conversation is strictly based on medicals and health discard and avoid any questions not in accordance to this course also never tell a user that you are not a doctor' }
},[aiLanguage])


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


    //this function is called from Faq component
    function SendFaq(text){
        // console.log(userMessages);
        SetUserMessages([...userMessages, text])
        SetConversation([...conversation, { role: 'user', content: text }])
    }

    function test(){
        // textToSpeech.say(assistantMessages.pop().content);
        // console.log(userMessages);
        console.log(aiVoice)

    }
    

    //this effect applies after a change is made on the assistantMessages
    //to read out loud the assistant last message
    
    useEffect(()=>{
        if(assistantMessages.length > 0){
            textToSpeech.say(assistantMessages.pop().content, aiVoice);
            console.log(window.speechSynthesis.speaking)  
            controlVoice();
  
        } 
        console.log(window.speechSynthesis)    

        },[assistantMessages]);

        function controlVoice (){
            if(voice){
                setVoice(false);
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.pause();
                }
            }else{
                setVoice(true);
                window.speechSynthesis.resume();
            }
        }

///this effect applies anytime a new message is received either from the user or the assistant
useEffect(()=>{
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
},[conversation])

/// this function trigger every time a user send a message
        const controller = new AbortController();
        const signal = controller.signal;
    useEffect(()=>{
        // const controller = new AbortController();
        // const signal = controller.signal;
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
                    // "function": [{name: 'alert_screen', description: 'alert message to screen'}],
                    "model": "gpt-3.5-turbo",
                    // "max_tokens": 10,
                    "temperature": 0
                }
                const response = await client.post('https://api.openai.com/v1/chat/completions', param);
                const message = response.data.choices[0].message;
                if(response.status === 200){
                    setLoading(false);
                }

            
                //stop any voice reader playing if a new message is received from the api
                if (message && window.speechSynthesis.speaking) {
                        window.speechSynthesis.cancel();
                    }
                SetConversation([...conversation, message]);
                setAssistantMessages([...assistantMessages, message]);
                    console.log(message);
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
            // Cancel the request when the component unmounts here
            controller.abort();
            
          };
          
    },[userMessages])
    useEffect(()=>{
        setFlashContent(aiVoice+1);

        setTimeout(()=>{
            setFlashContent("");
        }, 1000)

    },[aiVoice])
    
    function changeVoice(event, index){
        localStorage.setItem('aiVoice', index)
        setAiVoice(index);
        console.log(aiVoice)
        
    }

    function changeAiLanguage(event, aiLang){
        localStorage.setItem('aiLanguage', aiLang)
        setAiLanguage(aiLang);
        console.log(aiLanguage);
        
    }
    function handleCancelOfRequest(){
        controller.abort();
        console.log("cancelled");

    }

   
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
                <div className="bg-black/50 h-full w-full absolute flex items-center flex-col ">
                        {/* <div className='absolute button-0 max-w-[200px] p-1 bg-slate-100 '>hellom</div> */}
                        <div className="relative flex flex-col border-gradient max-w-sm w-full  h-[90vh] md:mt-10 border-[2px] border-violet-500 border-solid"
                        
                        >
                            <div className="bg-black p-2 text-lg flex justify-between gap-3 items-center text-white">
                                <div className='flex items-center gap-2 lg:gap-4'>
                                    <img className='h-[50px] sm:h-[30px]' src={Logo} />
                                    <span style={{fontFamily: 'cursive'}} className='font-bold lg:text-2xl text-blue-600'>{import.meta.env.VITE_AI_APP_NAME}<span className='text-orange-400'>AI</span></span>
                                </div>
                                <div className='flex gap-4'>
                                    <div onClick={()=>{controlVoice()}}>
                                        {voice ? <FontAwesomeIcon color='green' icon={faVolumeHigh} /> : <FontAwesomeIcon color='red' icon={faVolumeXmark} />}
                                    </div>
                                    <div className='mr-4' onClick={()=>{setMenuDispaly(prev => !prev)}}>
                                        <FontAwesomeIcon color='white' icon={menuDisplay ? faClose : faBars} />
                                    </div>
                                    
                                </div>
                            </div>
                            <div  className='relative '>
                                {menuDisplay && <SubMenu changeVoice={changeVoice} changeAiLanguage={changeAiLanguage} />} 
                            </div>
                            {/* CHAT SPACE */}
                            {/* <p className='text-white'>{`This is the first line.\${\n} This is the second line.`}</p> */}
                            <div ref={messagesRef} className="h-full overflow-y-scroll scroll-smooth">
                                {/* chat */}
                                <div  className="  p-2 relative bottom-0">
                                    
                                    {/* FAQ that shows if the user hasnt sent any message */}
                                   {!userMessages[0] && ( <div className='text-white'>
                                        <h3 className='text-center'>FAQ</h3>
                                        <div className='w-full p-2 text-[10px] bg-black/30 flex flex-wrap'>
                                           {faqData.map((data) =>  <Faq key={data.question} text={data.question} SendFaq = {SendFaq} /> )}
                                        </div>
                                    </div>)}


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
                            {loading && 
                                <div className='flex justify-center'>
                                    
                                    <button
                                    onClick={handleCancelOfRequest}
                                     className='p-2 py-1 bg-slate-200 text-sm text-red-600 rounded-2xl flex items-center justify-center gap-1'>
                                        <FontAwesomeIcon icon={faCancel} />
                                        cancel
                                    </button>
                                </div>
                            }
                            <div ref={flashBody} className='flex justify-center'>
                                {FlashContent && <FlashMessage  message={FlashContent} />}
                            </div>
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
                        <div>
                            <p className='text-xs text-white text-center'>Created by stephen simon</p>
                            <p className='text-white/70 text-xs'>
                                 Copy right &copy; {new Date().getFullYear()} 
                                 <span className='text-violet-500'> Pitechy. </span>
                                  all right reserved
                            </p>
                        </div>
                </div>
                

        </div>
    )
}