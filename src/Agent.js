import React from 'react';

class Agent extends React.Component {
    constructor(props) {
        super(props);

        // What defines this agent. 
        this.state = {
            pitch: 100,
            rate: 70,
            voice: '', 
            language: '',
            emotion: 'neutral',
            response: '',
            background: "",
        }; 
    }
    
    // Set the initial voice of the agent. 
    componentDidUpdate() {
        if (this.state.voice === '' && this.state.language === '') {
            this.setState({
                voice: this.props.voices[0].name,
                language: this.props.voices[0].lang
            });
        }
    }

    render() {
        var voices = this.createVoices(); 
        var color = this.state.background; 
        return (
            <div style={{backgroundColor: color}} className="agentcontainer">
                <div className="propertygroup">
                    <h4>Voice Identity</h4>
                    <select onChange={this.onVoiceChanged.bind(this)}>
                        {voices}
                    </select>
                </div>
                <div className="propertygroup">
                    <h4>Language</h4>
                    <p>{this.state.language}</p>
                </div>
                <div className="propertygroup">
                    <h4>Pitch</h4>
                    <input onChange={this.onPitchChanged.bind(this)} type="range" min="0" max="1000" defaultValue={this.state.pitch} />
                    <div>{this.state.pitch/100}</div>
                </div>
                <div className="propertygroup">
                    <h4>Rate</h4>
                    <input onChange={this.onRateChanged.bind(this)} type="range" min="0" max="300" defaultValue={this.state.rate} />
                    <div>{this.state.rate/100}</div>
                </div>
                <div className="propertygroup">
                    <h4>Emotion</h4>
                    <select onChange={this.onEmotionChanged.bind(this)}>
                        <option>neutral</option>
                        <option>anger</option>
                        <option>sadness</option>
                        <option>fear</option>
                        <option>joy</option>
                    </select>
                </div>
                <div className="propertygroup">
                    <h4>Response</h4>
                    <div>{this.state.response} </div>
                </div>
            </div>
        );
    }

    createVoices() {
        let voices = []; 
        if (this.props.voices.length) {
            voices = this.props.voices.map(v => 
                <option key={v.name} defaultValue={v.name}>
                {v.name}
                </option>
            );
        }
        return voices; 
    }

    setResponse(result) {
        this.setState({
            response: result
        }); 
    }
    
    clearResponse() {
        this.setState({
            response: ""
        });
    }

    onVoiceChanged(event) { 
        let lang = ''; 
        for (let v in this.props.voices) {
            let obj = this.props.voices[v];
            if (obj.name === event.target.value) {
                lang = obj.lang;
                break; 
            }
        }     

        this.setState({
            voice: event.target.value,
            language: lang
        });
    }

    onEmotionChanged(event) {
        this.setState({
            emotion: event.target.value
        });
    }

    onPitchChanged(event) {
        this.setState({
            pitch: event.target.value
        });
    }

    onRateChanged(event) {
        this.setState({
            rate: event.target.value
        });
    }

    activateBackground() {
        this.setState({
            background: "lightblue"
        }); 
    }

    deactivateBackground() {
        this.setState({
            background: ""
        });
    }
}

export default Agent;