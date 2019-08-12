import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
//import moment from 'moment';
import { Tag, Button, Form, Select, Input, message } from 'antd';
const { Option } = Select;
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensor: [],
            data: [],
            tasks: props.data,
            name: '',
            activate: '',
            lat:'',
            long:'',
            year:'',

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
    handleChangeLat = (event) => {
        this.setState({
            lat: event.target.value,
        });
    }
    handleChangeLong = (event) => {
        this.setState({
            long: event.target.value,
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
                lat: this.state.lat,
                long: this.state.long
            }
        }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/location',
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
                this.props.listGetAll();
                console.log(response);
                message.success('Location Created');
            })
            .catch((response) => {
                //handle error
                console.log(response);
                message.error('Location unable to create');
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("name:", this.state.name)
        console.log("year:", this.state.year)
        console.log("activation:", this.state.activate)
        console.log("lat:", this.state.lat)
        console.log("long:", this.state.long)
        this.fetchdata();
    }
    // onRender = () => {
    //     this.props.listGetAll();
    // }
    render() {

        //const { sensor } = this.state;
        //const time = moment(sensor.timestamp, 'X').format("LLLL")
        return (
            <div className="Dashboard">
                <div className="Dashboard-Header">
                    <div className="dashboard-names">
                        Create a New Location
                    </div>
                </div>
                <div className="form">


                    <Form >
                        <label>
                            <div className="form">
                                <Input
                                    placeholder="Name"
                                    type="text"
                                    value={this.state.name} onChange={this.handleChangeName} />
                            </div>
                        </label>
                        <label>
                            <div className="form">
                                <Input
                                    placeholder="Year"
                                    type="text"
                                    value={this.state.year} onChange={this.handleChangeYear} />
                            </div>
                        </label>
                        <div className="create-location">
                            Locations:
                        </div>
                        <label>
                            <div className="form-lat">
                                <Input
                                    placeholder="Latitude"
                                    type="text"
                                    value={this.state.lat} onChange={this.handleChangeLat} />
                            </div>
                        </label>

                        <label>
                            <div className="form-long">
                                <Input
                                    placeholder="Longitude"
                                    type="text"
                                    value={this.state.long} onChange={this.handleChangeLong} />
                            </div>
                        </label>
                        <label>
                            <div className="form">
                                <Select
                                    placeholder="Select activation"
                                    onChange={this.handleChangeActivation}>
                                    <Option value="active"><Tag color="green">Active</Tag></Option>
                                    <Option value="deactive"><Tag color="red">Deactive</Tag></Option>
                                </Select>
                            </div>
                        </label>
                        <div className="form">
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Create;