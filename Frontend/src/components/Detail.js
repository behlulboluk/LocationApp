import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import MapDetail from './MapDetail.js';
import Chart from './Chart.js';
//import moment from 'moment';
//import { Icon, Button } from 'antd';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensor: [],
            data: [],

        };
    }
    componentDidMount() {
        this.DetailGet();
    }
    DetailGet = () => {
        axios
            .get(`http://localhost:8000/api/location/` + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    sensor: response.data,
                    data: response.data.location,
                });
            });
    }

    render() {
        const { sensor, data } = this.state;
        //const time = moment(sensor.timestamp, 'X').format("LLLL")
        return (
            <div className="Dashboard">
                <div className="Dashboard-Header">
                    <div className="dashboard-names">
                        Detail
                    </div>
                    {/* <div className="Detail-Back">
                        <Link to={'/'} className="link">
                            <Button type="primary">
                                Go back
                        </Button>
                        </Link>
                    </div>
                    <div>
                        <p className="Detail-Sensorname"> ID: {this.props.match.params.id}</p>
                    </div>
                    <div >
                        <p className="Detail-Location">{data.lat} - {data.long}</p>
                    </div> */}
                </div>
                <div className="Detail-Sensorname">
                        <span > ID: {this.props.match.params.id}</span>
                    </div>
                <div className="Detail-Location">
                        <span >{data.lat} - {data.long}</span>
                    </div>
                <div className="Detail">
                    <MapDetail data={data} sensor={sensor} />
                    <div className="Detail-Chart">
                        <Chart />
                    </div>
                </div>

            </div>
        );
    }
}

export default Detail;