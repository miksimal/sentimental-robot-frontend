import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import HeadlinesAccordion from './HeadlinesAccordion/HeadlinesAccordion';

axios.defaults.baseURL = 'https://gp7dnv8i52.execute-api.eu-west-1.amazonaws.com/dev/getlatestbbc';

class App extends Component {
  state = {
    dates: []
  }

  componentDidMount () {
    axios.get('/')
        .then( response => {
          this.setState( { dates: response.data.data } );
        })
        .catch( error => {
            window.alert("Sorry, something went wrong. Please try again.");
            console.log("error: " + error);
        })
  }

  render() {
    return (
      <div className="App">
        <h2>Greetings earthling!</h2>
        <img src={logo} className="App-logo" alt="logo" />
            <h3>I'm a sensitive robot whose 
              <a
                className="App-link"
                href="https://youtu.be/wqzLoXjFT34"
                target="_blank"
                rel="noopener noreferrer"> purpose
              </a> is to read each morning's headlines and explain how they make me feel.
            </h3>
      <div><HeadlinesAccordion dates={this.state.dates} /></div>
    </div>
    );
  }
}

export default App;
