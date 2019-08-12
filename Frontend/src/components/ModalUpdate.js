import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

//import moment from 'moment';
import { Tag, Button, Select, Input, message, Modal } from 'antd';
const { Option } = Select;
class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      activate: this.props.data.activate,
      year: this.props.data.year,
      visible: true,
      
    };
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  }
  handleChangeYear = (event) => {
    this.setState({
      year: event.target.value,
    });
  }
  handleChangeActivation = (event) => {
    this.setState({
      activate: event,
    });
  }

  fetchdata() {
    const data = {
      name: this.state.name,
      year: this.state.year,
      activate: this.state.activate,
      location: {
        lat: this.props.data.location.lat,
        long: this.props.data.location.long
      }
    }
    axios({
      method: 'put',
      url: `http://127.0.0.1:8000/api/location/${this.props.data._id}`,
      data: data,
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    })
      .then((response) => {
        //handle success
        //console.log(response);
        message.success('Location Updated');
        this.props.listGetAll();
      })
      .catch((response) => {
        //handle error
        //console.log(response);
        message.error('Location unable to Update');
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchdata();
    this.props.handleOk();
  }
  render() {
    // console.log("modalid",this.props.id)
    //console.log(this.state.visible)
    //const time = moment(sensor.timestamp, 'X').format("LLLL")
    return (
      <div>
        <Modal
          title="Edit Location"
          visible={this.state.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          confirmLoading={this.props.confirmLoading}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <div className="form">
            <p>ID:{this.props.data._id}</p>
          </div>
          <div className="form">
            <Input
              placeholder="Name"
              type="text"
              value={this.state.name} onChange={this.handleChangeName} /></div>
          <div className="form">
            <Input
              placeholder="Year"
              type="text"
              value={this.state.year} onChange={this.handleChangeYear} /></div>
          <div className="form">
            <Select
              value={this.state.activate}
              placeholder="Select activation" 
              style={{ width: 200 }}
              onChange={this.handleChangeActivation}>
              <Option value="active"><Tag color="green">Active</Tag></Option>
              <Option value="deactive"><Tag color="red">Deactive</Tag></Option>
            </Select>
          </div>
        </Modal>

      </div>
    );
  }
}

export default ModalUpdate;