// Inititalize voice. 
var agentVoice = new p5.Speech(); 
agentVoice.onLoad = onVoicesLoaded;
var voices = [];

// Select element
var voicesSelect; 
var language; 
// Rate and pitch
var pitchSlider, rateSlider, pitchVal, rateVal;
// User input text box; 
var userInput; var emotion; var response; 

// Cakechat bot
var cakechat; 

function setup() {
  noCanvas();
  cakechat = new Cakechat(); 
}

function draw() {
}

function onVoicesLoaded() {
  // Initialize the system. 
  getHTMLElements();

  // Load all the voices into the drop-down menu. 
  for (var v in agentVoice.voices) {
    var option = document.createElement("option");
    var identity = {
      name: agentVoice.voices[v].name,
      language: agentVoice.voices[v].lang
    }
    voices.push(identity); 
    option.text = identity.name; 
    option.setAttribute('lang', identity.language);
    voicesSelect.add(option);
  }

  // Select a default value
  voicesSelect.value = voices[0].name;
  language.innerText = voices[0].language;
  agentVoice.setVoice(voices[0].name)
  
  // Set default pitch and rate. 
  agentVoice.setPitch(getPitch());
  agentVoice.setRate(getRate()); 

  // Set the values
  pitchVal.innerText = getPitch(); rateVal.innerText = getRate(); 

  console.log('Init Voice: ' + voices[0].name);
}

function onVoiceSelected(event) {
  var targetEl = event.target; 

  // Get name and language. 
  var idx = targetEl.selectedIndex; 
  var name = targetEl.value; 
  var lang = targetEl[idx].lang; 

  // Set name and language. 
  voicesSelect.value = name;
  language.innerText = lang;

  // Set the voice to this language. 
  agentVoice.setVoice(name);

  // Set default pitch and rate. 
  agentVoice.setPitch(getPitch());
  agentVoice.setRate(getRate());

  console.log('New Voice: ' + name);
}

function onSendInput() {
  // Let the agent speak this. 
  var val = userInput.value; 
  console.log('Cakechat Request: Context ' + val + ', Emotion ' + emotion.value);
  cakechat.getResponse(val, emotion.value, this.cakechatCallback); 
}

function onPitchChange() {
  // Set default pitch and rate. 
  agentVoice.setPitch(getPitch());
  pitchVal.innerText = getPitch();
}

function onRateChange() {
  // Set default pitch and rate. 
  agentVoice.setRate(getRate());
  rateVal.innerText = getRate(); 
}

function getPitch() {
  return pitchSlider.value/100;
}

function getRate() {
  return rateSlider.value/100; 
}

function getHTMLElements() {
  voicesSelect = document.getElementById("voices");
  language = document.getElementById("lang");
  pitchSlider = document.getElementById('pitch');
  rateSlider = document.getElementById('rate'); 
  pitchVal = document.getElementById('pitchval'); 
  rateVal = document.getElementById('rateval');
  userInput = document.getElementById("userinput"); 
  emotion = document.getElementById("emotion"); 
  response = document.getElementById("response");
}

function cakechatCallback(result, emotion) {
  if (result == "ERROR") {
    console.log("Main: Cakechat is unavailable."); 
  } else {
    console.log("Main: Cakechat is available."); 
    response.innerText = result; 
    agentVoice.speak(result);
  }
}