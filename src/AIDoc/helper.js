export const textToSpeech = {
  text: "",
  say: function (text, voice) {
    if (window.speechSynthesis) {
      var speech = new SpeechSynthesisUtterance(text);
      speech.voice = window.speechSynthesis.getVoices()[voice];
      window.speechSynthesis.speak(speech);
    } else {
      console.log("browser does not support text to speech");
    }
  },
  //
  pause: () => {
    window.speechSynthesis.pause();
  },
  resume: () => {
    window.speechSynthesis.resume();
  },
  mute: () => {
    speech.volume = 0;
    // if (window.speechSynthesis.speaking){
    // }
  },
  unmute: () => {
    speech.volume = 1.0;
  },
};
