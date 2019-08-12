import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Map from './Map.js';
import axios from 'axios';
import { Icon, Tag, Popconfirm, message } from 'antd';
//import moment from 'moment';
import ModalUpdate from './ModalUpdate';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //sensors: props.sensors,
            visible: false,
            confirmLoading: false,
            data: [],
            activeSensor: null,
            deactiveSensor: null,
            // modal:false
            //timestamp: props.timestamp,
        }
    }

    showModal = (data) => {
        this.setState({
            visible: true,
            data: data
        });
    };
    handleOk = e => {

        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    deleteTask(index, e) {
        axios.delete(`http://127.0.0.1:8000/api/location/${index}`)
            .then(res => this.props.listGetAll());
        message.success('Click on Yes');
        console.log(index)
    }

    cancel(e) {
        console.log(e);
        message.error('No deleted');
    }

    componentDidMount() {
        this.SensorNumbers();
    }

    SensorNumbers() {
        let countActive = 0
        let countDeactive = 0
        const activation = this.props.sensors.map((res,index) => 
        {
            if (res.activate === "active") {
                countActive += 1
            }
            else{
                countDeactive += 1
            }
        })
        this.setState({
            activeSensor:countActive,
            deactiveSensor:countDeactive
        })
    }

    render() {
        const { sensors } = this.props;
        //const time = moment(timestamp, 'X').format("LLLL")
        return (
            <div >

                <div className="Dashboard">
                    <div className="Dashboard-Header">

                        <div className="dashboard-names">
                            {/* <Icon type="environment" /> */}
                            Dashboard
                    </div>

                    </div>

                    {/* <div className="active-deactive">
                        <Icon type="environment" theme="filled" style={{ color: '#28b317'}} />
                        Active: {sensors.length} sensors
                        </div>
                    <div className="active-deactive">
                        <Icon type="environment" theme="filled" style={{ color: 'red'}}/>
                        Deactive: {sensors.length} sensors
                        </div> */}
                    <div className="Map">
                        <Map sensors={sensors} />
                    </div>

                    <div>
                        <span className="dashboard-names-1">Current Trips</span>

                        <div className="active-deactive">
                            {/* <Icon type="environment" theme="filled" style={{ color: '#28b317'}} /> */}
                            Active: {this.state.activeSensor} sensors
                        </div>
                        <div className="active-deactive">
                            {/* <Icon type="environment" theme="filled" style={{ color: 'red'}}/> */}
                            Deactive: {this.state.deactiveSensor} sensors
                        </div>
                    </div>
                    <div>
                        <table className="List">
                            <thead className="Table-head">
                                <tr >
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Year</th>
                                    <th>Activation Date</th>
                                    <th>Activate</th>
                                    <th>view</th>
                                    <th>Delete</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody className="Table-body">
                                {sensors.map((result) => (
                                    <tr key={result._id}>
                                        <td >
                                            <span >{result._id}</span>
                                        </td>
                                        <td>
                                            <span>{result.name}</span>
                                        </td>
                                        <td>
                                            {/* {timestamp ? <span>{time}</span> : <span>Loading...</span>} */}
                                            <span>{result.year}</span>
                                        </td>
                                        <td>
                                            {/* {timestamp ? <span>{time}</span> : <span>Loading...</span>} */}
                                            <span>{result.time}</span>
                                        </td>
                                        <td>
                                            {result.activate === "active" ?
                                                <Tag color="green">{result.activate.toUpperCase()}</Tag> :
                                                <Tag color="red">{result.activate.toUpperCase()}</Tag>}

                                        </td>
                                        <td>
                                            <Link to={'/detail/' + result._id}>View</Link>
                                        </td>
                                        <td>
                                            <Popconfirm
                                                title="Are you sure delete this location?"
                                                onConfirm={(e) => this.deleteTask(result._id, e)}
                                                onCancel={this.cancel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Icon type="delete" style={{ fontSize: '17px' }} theme="twoTone" twoToneColor="#ff4d4f" />
                                            </Popconfirm>
                                        </td>
                                        <td>
                                            {/* <Button type="primary" onClick={this.showModal} >
                                Update
                            </Button> */}
                                            <Icon type="edit" theme="twoTone" style={{ fontSize: '17px' }}
                                                onClick={() => this.showModal(result)} />


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {this.state.visible === true && <ModalUpdate handleOk={this.handleOk}
                            handleCancel={this.handleCancel}
                            sensors={sensors}
                            data={this.state.data} confirmLoading={this.state.confirmLoading} listGetAll={this.props.listGetAll} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default List;
