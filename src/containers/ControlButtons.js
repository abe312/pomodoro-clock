import React, { Component } from 'react';
import './ControlButtons.scss';

import { connect } from 'react-redux';

class ControlButtons extends Component {
  setSessionTime = () => {
    let date = new Date();

    let sessionEndDate = new Date(
      date.getTime() + 60000 * this.props.controls.session
    );
    window.sessionI = setInterval(calculate, 1000);
    var that = this;
    function calculate() {
      let startDate = new Date().getTime();
      let timeRemaining = parseInt((sessionEndDate - startDate) / 1000);

      if (timeRemaining >= 0) {
        let minutes = parseInt(timeRemaining / 60);
        let seconds = parseInt(timeRemaining);
        console.log('in sessions', minutes, seconds);
      } else {
        // this.props.setBreak();
        that.setBreakTime();
      }
    }
  };

  setBreakTime = () => {
    let date = new Date();

    let breakEndDate = new Date(
      date.getTime() + 60000 * this.props.controls.breakL
    );
    window.breakI = setInterval(calculate, 1000);
    var that = this;
    function calculate() {
      let startDate = new Date().getTime();
      let timeRemaining = parseInt((breakEndDate - startDate) / 1000);

      if (timeRemaining >= 0) {
        let minutes = parseInt(timeRemaining / 60);
        let seconds = parseInt(timeRemaining);
        console.log('in breaks', minutes, seconds);
      } else {
        // this.props.setSession();
        that.setSessionTime();
      }
    }
  };

  play = () => {
    // let breakTime = new Date(
    //   date.getTime() + 60000 * this.props.controls.breakL
    // );
    this.setSessionTime();
  };
  pause = () => {
    clearInterval(window.sessionI);
    clearInterval(window.breakI);
  };
  reset = () => {
    this.props.setSession();
  };
  render() {
    return <div> </div>;
  }
}

const mapStateToProps = ({ controls }) => ({
  controls,
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons);
