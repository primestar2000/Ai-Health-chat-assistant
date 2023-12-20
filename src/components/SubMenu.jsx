import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faHomeLg, faLanguage, faPaperPlane, faRobot, faSpinner, faUser, faVolumeHigh, faVolumeMute, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import Accordion from './Accordion';
import { languages } from '../AIDoc/data';
export default function SubMenu (props){
    
    

    return(
        <div className='absolute z-20 p-2 bg-black/80 w-full right-0'>
            <Accordion title="Voices" iconVar={faRobot}>
                <div className='max-h-[300px] overflow-y-scroll'>
                    <ol className='text-white list-decimal'>
                        {window.speechSynthesis ?
                        window.speechSynthesis.getVoices().map((voice, i, arr)=>
                        <li
                         
                        key={i}
                        onClick={()=>{props.changeVoice(event, i) }}
                        
                        className='hover:bg-white text-xs hover:text-slate-800 cursor-pointer p-2'
                        >{`${i+1} . ${voice.name}`}</li>
                        )
                        :
                        <p>Voice not Found</p>
                        }
                    </ol>
                </div>
            </Accordion>
            {/* <Accordion title="Languages" iconVar={faLanguage}>
                <div className='max-h-[300px] overflow-y-scroll'>
                    <ol className='text-white list-decimal'>
                        {languages.map((language, index)=>
                            <li 
                            key={index} 
                            onClick={()=>{props.changeAiLanguage(event, language.language)}}
                            className='hover:bg-white text-xs hover:text-slate-800 cursor-pointer p-2'
                            >{ `${index+1} .  ${language.language}`}
                            </li>
                        )}
                    </ol>
                </div>
            </Accordion> */}
        </div> 
    )
}