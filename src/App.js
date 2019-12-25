import React from 'react';
import './App.css';
import Agent from './Agent.js';
import UserInput from './UserInput.js';
import Cakechat from './Cakechat.js';

class App extends React.Component {
  constructor(props) {
    super(props);


    // Obtain speech object from the browser. 
    this.synth = window.speechSynthesis;
    this.synth.onvoiceschanged = this.populateVoices.bind(this); // Called when all the voices are loaded. 
    this.cakechat = new Cakechat(); 
   
    this.state = {
      voices: []
    }; 

    this.shouldStop = false; 
    this.numAgents = 8; 
    this.activeAgent = 0;
    this.agentRefs = [];

    this.createAgentRefs(); 
  }

  render() {
    let agents = this.createAgents(); 

    return (
      <div className="container">
        <div className="agents">
          {agents}
        </div>
        <UserInput 
          onSend={this.onSendInput.bind(this)} 
          onStop={this.onStopTalking.bind(this)} />
      </div>
    );
  }

  createAgents() {
    let agents = [];
    for (let i = 0; i < this.numAgents; i++) {
      let c = <Agent ref={this.agentRefs[i]} voices={this.state.voices} key={i}/>
      agents.push(c); 
    }
    return agents;
  }

  createAgentRefs() {
    for (let i = 0; i < this.numAgents; i++) {
      var r = React.createRef(); 
      this.agentRefs.push(r); 
    }
  }

  populateVoices() {
    var voices = this.synth.getVoices().map(obj => {
      return {
        name: obj.name,
        lang: obj.lang
      };
    }); 

    // This will prompt a re-render of app. 
    this.setState({
      voices: voices
    });
  }

  onStopTalking() {
    this.synth.cancel(); 
    this.shouldStop = true; 
  }

  onSendInput(inputValue) {
    let agent = this.agentRefs[this.activeAgent].current; 
    let state = agent.state; 

    this.shouldStop = false
    agent.activateBackground(); 
    agent.clearResponse();

    console.log('Cakechat: Query, Emotion - ' + inputValue + ', ' + state.emotion);
    this.cakechat.getResponse(inputValue, state.emotion, this.cakechatCallback.bind(this)); 
  }

  cakechatCallback(result, emotion) {
    let agent = this.agentRefs[this.activeAgent].current; 
    let state = agent.state; 

    // Get the voice object based on state. 
    let v = this.synth.getVoices().filter(obj => {
      return obj.name === state.voice; 
    }); 

    // Set agent response and activate background. 
    agent.setResponse(result); 

    // Create utter object. 
    let utterThis = new SpeechSynthesisUtterance(result); 
    utterThis.voice = v[0]; 
    utterThis.pitch = state.pitch/100; 
    utterThis.rate = state.rate/100; 
    utterThis.onend = this.onSpeechEnded.bind(this); 

    // Utter the words. 
    this.synth.speak(utterThis); 
  }

  onSpeechEnded(event) {
    // Deactivate background. 
    let agent = this.agentRefs[this.activeAgent].current; 
    agent.deactivateBackground(); 

    if (this.shouldStop) {
      // Ignore.
    } else {
      // Set next agent that will utter the words. 
      this.activeAgent = (this.activeAgent + 1) % this.numAgents; 

      // Send the result as the input for the next utterance. 
      this.onSendInput(event.utterance.text); 
    }
  }
}

export default App;

// Deploy the agent to the website (finalize the prototype)