// Agent voice. 
var agentVoice = new p5.Speech(); 
agentVoice.onLoad = onVoicesLoaded;
var voices = [];

// Agents. 
var agentA; var agentB; 

// User input. 
var userInput; 

// Cakechat bot
var cakechat; 

function setup() {
  noCanvas();
  cakechat = new Cakechat(); 
  agentA = new AgentA(); 
  agentB = new AgentB(); 

  // Voices are loaded, so set the voices for agents. 
  agentA.setVoices(this.voices); 
  agentB.setVoices(this.voices);
}

function draw() {
}

function onVoicesLoaded() {
  // Store all the voices in memory. 
  for (var v in agentVoice.voices) {
    var identity = {
      name: agentVoice.voices[v].name,
      language: agentVoice.voices[v].lang
    }
    voices.push(identity); 
  }
  console.log('Init Voice: ' + voices[0].name);
}

function onSendInput() {
  // Let the agent speak this. 
  var val = userInput.value; 
  console.log('Cakechat Request: Context ' + val + ', Emotion ' + emotion.value);
  cakechat.getResponse(val, emotion.value, this.cakechatCallback); 
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

  // agentVoice.setVoice(voices[0].name)
  // agentVoice.setPitch(getPitch());
  // agentVoice.setRate(getRate()); 

  // // Set the values