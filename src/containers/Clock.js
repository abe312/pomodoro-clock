import React, { Component } from 'react';
import './Clock.scss';
import { connect } from 'react-redux';
import classnames from 'classnames';

class Clock extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    isBreak: false,
    isPaused: false,
    display: 'Session',
  };
  componentWillReceiveProps(newProps) {
    this.clear();
    this.setState({
      ...this.state,
      minutes: newProps.controls.session,
      seconds: 0,
      isPaused: false,
      isBreak: false,
      display: 'Session',
    });
  }
  componentWillUnmount() {
    this.clear();
  }
  componentDidMount() {
    // auto scroll to the clock on mobile screens
    window.onload = function() {
      setTimeout(() => {
        window.scrollTo(0, 150);
      }, 3000);
    };

    let that = this;
    window.calculate = function(endDate, isBreak = false) {
      let startDate = new Date().getTime();
      let timeRemaining = parseInt((endDate - startDate) / 1000) + 1;
      if (timeRemaining >= 0) {
        let minutes = parseInt(timeRemaining / 60);
        let seconds = parseInt(timeRemaining % 60);
        that.setState({ ...that.state, minutes, seconds, isBreak });
        if (isBreak) console.log('in breaks', minutes, seconds);
        else console.log('in session', minutes, seconds);
      } else {
        // this.props.setSession();
        // this.setSessionTime();
        let alarm = document.getElementById('bell');
        alarm.currentTime = 0;
        alarm.play();
        if (isBreak) {
          that.clear();
          that.setSessionTime();
        } else {
          that.clear();
          that.setBreakTime();
        }
      }
    };
  }
  setBreakTime = () => {
    let date = new Date();
    let breakEndDate;
    this.setState({ ...this.state, display: 'Break' });
    if (this.state.isPaused) {
      console.log('setbreak if');
      breakEndDate = new Date(
        date.getTime() + 60000 * this.state.minutes + 1000 * this.state.seconds
      );
    } else {
      console.log('setbreak else');
      breakEndDate = new Date(
        date.getTime() + 60000 * this.props.controls.breakL
      );
    }

    window.breakI = setInterval(function() {
      window.calculate(breakEndDate, true);
    }, 1000);
  };
  setSessionTime = () => {
    let date = new Date();
    let sessionEndDate;
    this.setState({ ...this.state, display: 'Session' });
    if (this.state.isPaused) {
      console.log('setsession if');
      sessionEndDate = new Date(
        date.getTime() + 60000 * this.state.minutes + 1000 * this.state.seconds
      );
    } else {
      console.log('setsession else');
      sessionEndDate = new Date(
        date.getTime() + 60000 * this.props.controls.session
      );
    }
    window.sessionI = setInterval(function() {
      window.calculate(sessionEndDate);
    }, 1000);
  };

  clear = () => {
    clearInterval(window.sessionI);
    clearInterval(window.breakI);
  };
  play = () => {
    this.setSessionTime();
    this.setState({ ...this.state, isPaused: false });
  };
  pause = () => {
    this.clear();
    this.setState({ ...this.state, isPaused: true });
  };
  reset = () => {
    this.clear();
    this.setState({
      ...this.state,
      minutes: this.props.controls.session,
      seconds: 0,
      isPaused: false,
      isBreak: false,
      display: 'Session',
    });
  };

  render() {
    const { minutes, seconds } = this.state;
    return (
      <>
        <div className='clock-digital'>
          <p className={classnames('session', { break: this.state.isBreak })}>
            {this.state.display}
          </p>
          <span className='date'>
            {minutes < 10 ? '0' + minutes : minutes}{' '}
            <span className='blink'>:</span>{' '}
            {seconds < 10 ? '0' + seconds : seconds}
          </span>
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
        <audio id='bell' src='sounds/bell.mp3'></audio>
      </>
    );
  }
}

const mapStateToProps = ({ controls }) => ({
  controls,
});
// const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, null)(Clock);
