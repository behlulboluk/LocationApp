import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import { Link } from 'react-router-dom';
import { Icon } from 'antd';

//AIzaSyBbcRXTodg7_u3CbC4UBI9zJhtrGU_rUA8
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: 0,
            center: {
                lat: 41.010211,
                lng: 29.1346693,
            },
            zoom: 10,
            sensors: props.sensors,
        }
    }

    setOn(event) {
        console.log(event.target)
        this.setState({
            toggle: 1
        })
    }
    setOff(event) {
        console.log(event.target)
        this.setState({
            toggle: 0
        })
    }
    render() {
        const { sensors } = this.state;
        const AnyReactComponent = () => <div >
            <Icon type="environment" theme="filled" style={{ fontSize: '25px', color: '#3a84ff' }} />
            {/* <Badge status="success" text="Success" /> */}
            {/* <Badge status="processing" /> */}
            </div>;
        return (
            <div>
                <div className="Bitmap">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBbcRXTodg7_u3CbC4UBI9zJhtrGU_rUA8' }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
                        {sensors.map((result) => (
                            <AnyReactComponent
                            key={result._id}
                            lat={result.location.lat}
                            lng={result.location.long}
                            />
                        ))}
                    </GoogleMapReact>

                </div>
            </div>
        )
    }
}

export default Map;
