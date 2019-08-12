import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'antd';

//AIzaSyBbcRXTodg7_u3CbC4UBI9zJhtrGU_rUA8
class MapDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: 0,
            center: {
                lat: 41.010211,
                lng: 29.1346693,
            },
            sensor: props.sensor,
            zoom: 10,
            data: props.data,
        }
    }

    setOn() {
        this.setState({
            toggle: 1
        })
    }
    setOff() {
        this.setState({
            toggle: 0
        })
    }

    render() {
        const { data, sensor } = this.props;
        const AnyReactComponent = () => <div>
        {this.state.toggle === 0 && <div className="icon-loc" onClick={() => this.setOn()}><Icon type="environment" theme="filled"/></div>}
            {this.state.toggle === 1 &&
                <div className="PinRectangle">
                    <Icon type="close-circle" theme="filled" style={{ float: "right", fontSize: '20px', paddingTop: '8px', paddingRight: '5px' }} onClick={() => this.setOff()} />
                    <div style={{ float: "left", fontSize: '20px', paddingTop: '8px', paddingLeft: '8px' }}>
                        {sensor.id}
                    </div>
                    <div style={{ float: "left", fontSize: '13px', paddingTop: '15px', paddingLeft: '8px' }}>
                        <Icon type="environment" theme="filled" style={{ paddingRight: '5px' }} /> {data.lat} - {data.long}
                    </div>
                </div>}
        </div>
        return (
            <div>
                <div className="Detail">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBbcRXTodg7_u3CbC4UBI9zJhtrGU_rUA8' }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
                        <AnyReactComponent
                            lat={data.lat}
                            lng={data.long}
                        />

                    </GoogleMapReact>

                </div>
            </div>
        )
    }
}

export default MapDetail;
