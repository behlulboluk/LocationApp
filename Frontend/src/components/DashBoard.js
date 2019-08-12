import React, { Component } from 'react';
import List from './List.js';
import Detail from './Detail.js';
import Create from './Create';
import Header from './Header.js';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import socketIOClient from "socket.io-client";
class DashBoard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
      //timestamp:false,
      //endpoint:"http://127.0.0.1:4001",
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted){
      this.listGetAll();
    }
    
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on("FromAPI", data => this.setState({ timestamp: data }));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  listGetAll = () => {
    // axios.all([
    //   axios.get(`https://wunder-sensor-data.herokuapp.com/api/sensor/sensor_1`),
    //   axios.get(`https://wunder-sensor-data.herokuapp.com/api/sensor/sensor_2`),
    //   axios.get(`https://wunder-sensor-data.herokuapp.com/api/sensor/sensor_3`),
    //   axios.get(`https://wunder-sensor-data.herokuapp.com/api/sensor/sensor_4`),
    // ])
    //   .then(axios.spread((sensor1, sensor2, sensor3, sensor4) => {
    //     this.setState({
    //       sensors: [sensor1.data, sensor2.data, sensor3.data, sensor4.data],
    //     })
    //   }))
    //   .catch(error => console.log(error));

    axios.get(`http://localhost:8000/api/location`)
      .then((response) => {
        this.setState({
          sensors: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { sensors } = this.state;
    const Listprops = () => <List sensors={sensors} listGetAll={this.listGetAll} />
    const Createprops = () => <Create listGetAll={this.listGetAll} />
    return (
      <React.Fragment>
        <Router>
          <Header sensors={sensors} />
          <Route path="/create" component={Createprops} />
          <Route path="/detail/:id" component={Detail} />
          <Route exact path="/" component={Listprops} />
        </Router>
      </React.Fragment>
    );
  }
}

export default DashBoard;
