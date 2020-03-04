import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import { ScrumContext2 } from "../Context/ScrumContext";
 class RoomManteinerPage extends Component {
     static contextType = ScrumContext2 
    constructor(props){
        super(props)
        
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default withRouter(RoomManteinerPage)
