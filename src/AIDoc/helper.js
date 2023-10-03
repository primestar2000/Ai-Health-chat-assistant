export const textToSpeech = {
  say: function (text){
      if(window.speechSynthesis){
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(text) )
      }else{
          console.log('browser does not support text to speech');
      }
      
  },
  //
  pause: () => {window.speechSynthesis.pause();},
  resume: ()=>{window.speechSynthesis.resume()}
}