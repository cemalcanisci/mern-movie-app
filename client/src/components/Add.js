import React, { Component } from 'react'
import {connect} from 'react-redux';
class Add extends Component {
    render() {
        return (
            <div>
                ekle
            </div>
        )
    }
}
const mapStateToProps = state=>state;
const mapDispatchToProps = {

}
export default connect(mapStateToProps,mapDispatchToProps)(Add)