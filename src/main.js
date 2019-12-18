// Agent voice. 
var agentVoice = new p5.Speech(); 
agentVoice.onLoad = onVoicesLoaded.bind(this);
agentVoice.onEnd = onSpeechEnded.bind(this);
var voices = [];

// Agents. 
var agentA; var agentB; 

// User input. 
var userInput; 

// Cakechat bot
var cakechat; var emotion; var resultToFollow; 

var talkingAgent = 0; 
var isStop = false; 

function setup() {
  userInput = document.getElementById('userinput');
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
  setAgentParams(); 
  isStop = false; 

  var val = userInput.value; 
  console.log('Cakechat Request: Context ' + val + ', Emotion ' + emotion);
  cakechat.getResponse(val, emotion, this.cakechatCallback); 
}

function cakechatCallback(result, emotion) {
  if (result == "ERROR") {
    console.log("Main: Cakechat is unavailable."); 
  } else {
    if (isStop) return; 
    
    console.log("Main: Cakechat is available."); 
    if (talkingAgent == 0) {
      agentA.setResponse(result);
      // set next agent. 
      talkingAgent = 1; 
    } else {
      agentB.setResponse(result);
      // set next agent. 
      talkingAgent = 0; 
    }
    agentVoice.speak(result);
    resultToFollow = result;
  }
}

function setAgentParams() {
  if (talkingAgent == 0) {
    console.log('Agent A will speak.')
    // Set AgentA params
    agentVoice.setVoice(agentA.voicesSelect.value)
    agentVoice.setPitch(agentA.getPitch());
    agentVoice.setRate(agentA.getRate()); 
    emotion = agentA.getEmotion(); 
  } else {
    console.log('Agent B will speak');
    // Set AgentB params
    agentVoice.setVoice(agentB.voicesSelect.value)
    agentVoice.setPitch(agentB.getPitch());
    agentVoice.setRate(agentB.getRate()); 
    emotion = agentB.getEmotion();
  }
}

function onSpeechEnded() {
  console.log("Speech has ended"); 

  setAgentParams();

  if (isStop) {
    // Stop the bot. 
  } else {
    // Follow the request
    cakechat.getResponse(resultToFollow, emotion, this.cakechatCallback); 
  }
}

function onStop() {
  agentVoice.stop();
  isStop = true; 
}