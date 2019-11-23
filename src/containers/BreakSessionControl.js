import React, { Component } from 'react';
import './BreakSessionControl.scss';

import { connect } from 'react-redux';
import { breakInc, breakDec, sessionInc, sessionDec } from '../store/actions';

class BreakSessionControl extends Component {
  render() {
    const { breakInc, breakDec, sessionInc, sessionDec } = this.props;
    const { breakL, session } = this.props.controls;
    return (
      <div className='controls'>
        <div className='control break'>
          <p className='lead'>Break Length</p>
          <span className='control__button' onClick={breakDec}>
            <i className='fas fa-arrow-down'></i>
          </span>
          <span className='digit'>{breakL}</span>
          <span className='control__button' onClick={breakInc}>
            <i className='control fas fa-arrow-up'></i>
          </span>
        </div>
        <div className='control session'>
          <p className='lead'>Session Length</p>
          <span className='control__button' onClick={sessionDec}>
            <i className='control fas fa-arrow-down'></i>
          </span>
          <span className='digit'>{session}</span>
          <span className='control__button' onClick={sessionInc}>
            <i className='control fas fa-arrow-up'></i>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ controls }) => ({
  controls,
});

const mapDispatchToProps = dispatch => ({
  breakInc: () => dispatch(breakInc()),
  breakDec: () => dispatch(breakDec()),
  sessionInc: () => dispatch(sessionInc()),
  sessionDec: () => dispatch(sessionDec()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakSessionControl);
