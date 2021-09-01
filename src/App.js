import logo from './logo.svg';
import './App.css';
import React, { useLayoutEffect } from 'react';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

class DbReader extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: [], fetching: true};
  }

  componentDidMount() {
    fetch("/admin/contact/api")
      .then((res) => res.json())
      .then((json) => {
        this.setState({data: json, fetching: false});
      })
      .catch((error) => {
        console.error(error);
        this.setState({fetching: false});
      });
  }

  render() {
    if(this.state.fetching){
      return <h1>LOADING...</h1>;
    } else if (this.state.data.length <= 0) {
      return <h1>DATABASE EMPTY</h1>;
    }
    //const keys = this.state.data[0].keys();
    // console.log(Object.keys(this.state.data[0])[0]);

    // const title = Object.keys(this.state.data[0])[1];
    // const id = Object.keys(this.state.data[0])[0];
    //const item = this.state.data[0][Object.keys(this.state.data[0])[1]];

    // const list = (
    //   <div>
    //     <h3>{title}</h3>
    //     <ul>
    //       {this.state.data.map(e => <li key={e[id]}>{e[title]}</li>)}
    //     </ul>
    //   </div>
    // );
    const keys = Object.keys(this.state.data[0]);
    const listItems = keys.map(key => {
      var title = key;
      const id = Object.keys(this.state.data[0])[0];
      console.log(id);
      if (title == 'id') {
        return null;
      }
      return (
        <div>
          <h3>{title}</h3>
          <ul>
            {this.state.data.map(e => <li key={e[id]}>{e[title]}</li>)}
          </ul>
        </div>
      );
    });

    return (
      <div>
        {listItems}
      </div>
    );
  }
}

export default App;
