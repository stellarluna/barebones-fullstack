// import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: 'It works!!!'
    }
  }

  render() {
    return (
      <div className='App'>
        {this.state.message}
      </div>
    );
  }
}

// export default App;
