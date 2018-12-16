import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      time:0,
      started:false,
      paused:false,
      laps:[]
    }
  }

  start=()=>{
    if(this.timer){
      clearInterval(this.timer)
    }
    this.timer=setInterval(()=>this.setState({
      time:this.state.time+10,
      started:true,
    }), 10)
  }
  stop=()=>{
    clearInterval(this.timer)
    this.setState({
      time:0,
      started:false,
      paused:false,
      laps:[],
    })
  }
  pause=()=>{
    clearInterval(this.timer)
    this.setState({
      paused:true
    })
  }
  restart=()=>{
    clearInterval(this.timer)
    this.setState({time: 0,  laps:[]});
    this.start()
  }
 
  lap=(currentTime)=>{
    if(this.state.started){
      this.setState(state => ({laps: [currentTime].concat(state.laps)}));
    }
    // this.ol.scrollTop=0 
  }
  clearlap=()=>{
    this.setState(state => ({laps: []}));
  }
  render() {
    const {time, started, laps, paused}=this.state
    const ms=Math.floor((time%1000)/10)
    const s=Math.floor((time/1000)%60)
    const m=(Math.floor(time / 1000 / 60)) % 60;
    const currentTime=`${m<10 ? "0" + m: m}:${s<10 ? "0" + s: s}:${ms<10 ? "0" + ms: ms}`

    return (
      <div className="App">
        <h1>STOPWATCH</h1>
        <div className="container">
          <div className="output"> {currentTime} </div>
        </div>
        <div className="control">
          <button onClick={this.start} className="start"> {paused?"Resume":"Start"}</button>
          <button onClick={this.restart} className="restart">Restart</button>
          <button onClick={this.pause} className="pause">Pause</button>
          <button onClick={this.stop} className="stop">Stop</button>
          <button onClick={e=> this.lap(currentTime)} disabled={!started} className="lap">Lap</button>
          {
            laps.length>0?(
              <button onClick={this.clearlap} className="clearlap">Clear</button>
            ):null
          }
        </div>
        <ol ref={elem=> this.ol = elem}>
          {
            laps.map((lap, i) => <li key={i}>{lap}</li>)
          }
        </ol>
      </div>
    );
  }
}

export default App;
