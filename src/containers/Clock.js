import React, { Component } from 'react';
import './Clock.scss';
import { connect } from 'react-redux';

class Clock extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    isBreak: false,
  };
  componentDidMount() {
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function setDate() {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = (seconds / 60) * 360 + 90;

      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      const mins = now.getMinutes();
      const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
      minsHand.style.transform = `rotate(${minsDegrees}deg)`;

      const hour = now.getHours();
      const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    setInterval(setDate, 1000);

    setDate();

    // auto scroll to the clock on mobile screens
    window.onload = function() {
      setTimeout(() => {
        window.scrollTo(0, 150);
      }, 3000);
    };

    let that = this;
    window.calculate = function(endDate, isBreak = false) {
      let startDate = new Date().getTime();
      let timeRemaining = parseInt((endDate - startDate) / 1000);

      if (timeRemaining >= 0) {
        let minutes = parseInt(timeRemaining / 60);
        let seconds = parseInt(timeRemaining);
        that.setState({ ...that.state, minutes, seconds, isBreak });
        console.log('in breaks', minutes, seconds);
      } else {
        // this.props.setSession();
        this.setSessionTime();
      }
    };
  }
  setBreakTime = () => {
    let date = new Date();

    let breakEndDate = new Date(
      date.getTime() + 60000 * this.props.controls.breakL
    );
    window.breakI = setInterval(window.calculate(breakEndDate, true), 1000);
  };
  setSessionTime = () => {
    let date = new Date();

    let sessionEndDate = new Date(
      date.getTime() + 60000 * this.props.controls.session
    );
    window.sessionI = setInterval(window.calculate(sessionEndDate), 1000);
  };

  play = () => {
    this.setSessionTime();
  };
  pause = () => {
    clearInterval(window.sessionI);
    clearInterval(window.breakI);
  };

  render() {
    return (
      <>
        <div id='clock'>
          <div className='clock-analog'>
            <div className='clock'>
              <div className='clock-face'>
                <div className='hand min-hand'></div>
                <div className='hand second-hand'></div>
                <div className='hand hour-hand'></div>
              </div>
            </div>
          </div>
          <div className='clock-digital'>
            <p>Break</p>
            <span className='date'>
              00 <span className='blink'>:</span> 00
            </span>
          </div>
        </div>
        <div className='control-buttons'>
          <span onClick={this.play}>
            <i className='fas fa-play'></i>
          </span>
          <span onClick={this.pause}>
            <i className='fas fa-pause'></i>
          </span>
          <span onClick={this.reset}>
            <i className='fas fa-redo'></i>
          </span>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ controls }) => ({
  controls,
});
// const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, null)(Clock);
