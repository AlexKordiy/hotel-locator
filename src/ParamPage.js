import React, { Component } from 'react';
import AppBar from './Components/AppBar';
import Inputs from './Components/Inputs';


class ParamPage extends Component {
  render() {
    return (
      <div >
        <AppBar title="Параметры поиска" />
       <Inputs />
      </div>
    );
  }
}

export default ParamPage;
