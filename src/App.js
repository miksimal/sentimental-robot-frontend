import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import HeadlinesAccordion from './HeadlinesAccordion/HeadlinesAccordion';
import Search from './Search/Search';
import Charts from './Charts/Charts';

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
        <div className="AppSection AppSection--Intro">
          <div>
            <h2>Greetings earthling!</h2>
            <h4>I'm a sensitive robot whose 
              <a
                className="App-link"
                href="https://youtu.be/wqzLoXjFT34"
                target="_blank"
                rel="noopener noreferrer"> purpose
              </a> is to read and analyse each morning's BBC headlines
            </h4>
            <p>Feel free to explore my analyses below. You can <a href="#accordion" className="App-link">explore the past days' data</a>, <a href="#search" className="App-link">search all of my memories</a>, and <a href="#charts" className="App-link">generate charts</a>.</p>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      <div id="accordion" className="AppSection AppSection--Accordion #accordion"><HeadlinesAccordion dates={this.state.dates} /></div>
      <div id="search" className="AppSection AppSection--Search #search"><Search /></div>
      <div id="charts" className="AppSection AppSection--Charts"><Charts /></div>
    </div>
    );
  }
}

export default App;
