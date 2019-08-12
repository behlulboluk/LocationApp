import React, { Component } from 'react';
import { Select} from 'antd';
import {  withRouter  } from 'react-router-dom';
const Option = Select.Option;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            sensors: props.sensors,
        }
    }

    handleChange = (event) => {
        this.setState({ value: event });
        console.log(`Search handleCahnge selected: ${event}`);
        this.props.history.push(`/detail/${event}`);
    }
    route = (event) => {
        console.log(event)
        // return <Link to={'/detail/' + this.state.value}></Link>
        
    }
    render() {
        const { sensors } = this.props;
        const options = sensors.map(result =>
            (<Option key={result._id} value={result._id}>
                {result.name}
                </Option>
            ));
        return (
            <div>
                {/* <div className="Search">
                <Icon type="search" />
                </div> */}
                <div>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        // onSelect={this.route}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {options}
                    </Select>
                    
                    {/* <Link to={'/detail/' + this.state.value}><Button outline='true' color="primary" >Detail</Button></Link> */}
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
