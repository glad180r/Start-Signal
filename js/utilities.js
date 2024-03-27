const wait = (wait_duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, wait_duration);
    })
}


const voiceCommand = (text) => {
    const synth = window.speechSynthesis;
    const speechObj = new SpeechSynthesisUtterance(text);
    synth.speak(speechObj);
}


const gunSound = new Audio('../audio/gun.mp3');


const playSound = (audioSource) => {
    audioSource.play();
}



const generateRandomWaitBetweenRange = (lowerLimit, upperLimit) => {
    return 1000 * (Math.random() * (upperLimit - lowerLimit) + lowerLimit); // returns in seconds
}

export { wait, voiceCommand, gunSound, playSound, generateRandomWaitBetweenRange}