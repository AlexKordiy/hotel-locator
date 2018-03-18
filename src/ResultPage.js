import React, { Component } from 'react';
import AppBar from './Components/AppBar';
import ResultsView from './Components/results';

class ResultPage extends Component {
  render() {
    return (
      <div >
        <AppBar title="Результаты поиска" />
        <br />
        <ResultsView />
      </div>
    );
  }
}

export default ResultPage;
