import React from 'react';

class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <div className="inputcontainer">
                <input onChange={this.onTextChanged.bind(this)} className="userinput" type="text"/>
                <button onClick={this.onSend.bind(this)}>SEND</button>
                <button onClick={this.onStop.bind(this)}>STOP</button>
            </div>
        );
    }

    onTextChanged(event) {
        this.setState({
            text: event.target.value
        }); 
    }

    onSend(event) {
        this.props.onSend(this.state.text); 
    }

    onStop(event) {
        this.props.onStop(); 
    }
}

export default UserInput; 