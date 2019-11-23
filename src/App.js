import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import BreakSessionControl from './containers/BreakSessionControl';
import Clock from './containers/Clock';
import ControlButtons from './containers/ControlButtons';

import { Provider } from 'react-redux';
import configureStore from './store';
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className='container'>
        <BreakSessionControl />
        <Clock />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
