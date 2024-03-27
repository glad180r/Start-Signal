import { wait, voiceCommand, gunSound, playSound, generateRandomWaitBetweenRange } from './utilities.js'



const statusBoard = document.querySelector('.status-board');
const onYourMarksButton =  document.querySelector('.on-your-marks-btn');




// Manage Settings
const settingsBtn = document.querySelector('.settings-btn');
const settingsMenu = document.querySelector('.settings-menu');
const closeSettingsBtn = document.querySelector('.close-settings-btn');
const changeSettingsBtn = document.querySelector('.change-settings-btn');
const defaultSettingsCheckbox = document.querySelector('#default-settings-checkbox');

// Set default times settings
const defaultTimeSettings = {
    // default wait duration limits
    'oym-set-min': 20.00,
    'oym-set-max': 35.00,
    'set-go-min': 1.50,
    'set-go-max': 3.00,
}

document.querySelector('#oym-set-min').disabled = true;
document.querySelector('#oym-set-min').value = defaultTimeSettings['oym-set-min'].toFixed(2) // this is the default value

document.querySelector('#oym-set-max').disabled = true;
document.querySelector('#oym-set-max').value = defaultTimeSettings['oym-set-max'].toFixed(2) // this is the default value

document.querySelector('#set-go-min').disabled = true;
document.querySelector('#set-go-min').value = defaultTimeSettings['set-go-min'].toFixed(2) // this is the default value

document.querySelector('#set-go-max').disabled = true;
document.querySelector('#set-go-max').value = defaultTimeSettings['set-go-max'].toFixed(2) // this is the default value



const timeSettings = { // will be changed if user wants to
    'oym-set-min': 20.00,
    'oym-set-max': 35.00,
    'set-go-min': 1.50,
    'set-go-max': 3.00,
}

settingsBtn.addEventListener('click', () => {
    settingsBtn.style.opacity = '0'; //hide the settings button
    settingsMenu.style.opacity= '1'; //Show the settings Menu
})


closeSettingsBtn.addEventListener('click', () => {
    settingsBtn.style.opacity = '1'; // show settings button
    settingsMenu.style.opacity = '0';
});


defaultSettingsCheckbox.addEventListener('change', () => {
    if(defaultSettingsCheckbox.checked === false){
        // Allowing input through the number boxes and button by removing the disabled 
        document.querySelector('#oym-set-min').disabled = false;
        document.querySelector('#oym-set-max').disabled = false;
        document.querySelector('#set-go-min').disabled = false;
        document.querySelector('#set-go-max').disabled = false;
        changeSettingsBtn.disabled = false;

    }else{ // Checkbox has been activated again so disable the inputs and reset the default values
        document.querySelector('#oym-set-min').disabled = true;
        document.querySelector('#oym-set-min').value = defaultTimeSettings['oym-set-min'].toFixed(2) // this is the default value

        document.querySelector('#oym-set-max').disabled = true;
        document.querySelector('#oym-set-max').value = defaultTimeSettings['oym-set-max'].toFixed(2) // this is the default value

        document.querySelector('#set-go-min').disabled = true;
        document.querySelector('#set-go-min').value = defaultTimeSettings['set-go-min'].toFixed(2) // this is the default value

        document.querySelector('#set-go-max').disabled = true;
        document.querySelector('#set-go-max').value = defaultTimeSettings['set-go-max'].toFixed(2) // this is the default value

        //disable the button
        changeSettingsBtn.disabled = true;
    }
})

changeSettingsBtn.addEventListener('click', () => {
    // Updating wait periods
        timeSettings['oym-set-min'] = parseFloat(document.querySelector('#oym-set-min').value);
        timeSettings['oym-set-max'] = parseFloat(document.querySelector('#oym-set-max').value);   
        timeSettings['set-go-min'] = parseFloat(document.querySelector('#set-go-min').value);
        timeSettings['set-go-max'] = parseFloat(document.querySelector('#set-go-max').value);   

    // Close the Settings Menu
    settingsBtn.style.opacity = '1'; // show settings button
    settingsMenu.style.opacity = '0';
})




async function starterFunction(){
    // Generating wait intervals
    const WAIT_TO_SET = generateRandomWaitBetweenRange(timeSettings['oym-set-min'], timeSettings['oym-set-max']);
    console.log((WAIT_TO_SET / 1000).toFixed(2));
    const WAIT_TO_GO = generateRandomWaitBetweenRange(timeSettings['set-go-min'], timeSettings['set-go-max']);
    console.log((WAIT_TO_GO / 1000).toFixed(2));

    onYourMarksButton.style.display = 'None'; // hide the On Your Marks button
    settingsBtn.style.display = 'None'; // hide the settings button

    // Display the wait times
    document.querySelector('#display-oym-set').setAttribute('value', (WAIT_TO_SET / 1000).toFixed(2));
    document.querySelector('#display-set-go').setAttribute('value', (WAIT_TO_GO / 1000).toFixed(2));

    // Trigger the On Your Marks command
    voiceCommand('On Your Marks!')
    statusBoard.innerText = 'On Your Marks!';



    await wait(WAIT_TO_SET);
    statusBoard.innerText = 'Set!'
    voiceCommand('Set!')


    await wait (WAIT_TO_GO)
    statusBoard.innerText = 'Go!'
    playSound(gunSound);

    // Re-display button
    await wait(3000); // short wait after Go to allow re-starting
    onYourMarksButton.style.display = 'block'; // show the On Your Marks button again
    statusBoard.innerText = ''; //reset the status board
    settingsBtn.style.display = 'block'; //show settings button again
}


onYourMarksButton.addEventListener('click', () => {
    console.log(timeSettings);
    starterFunction();
});

