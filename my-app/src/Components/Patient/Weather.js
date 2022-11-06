import React,{Component} from "react";
import axios from "axios";

export default class Weather extends Component{
    constructor(){
        super();
        this.state={
            weather:"not yet"
        };
    }


componentDidMount = () => {
axios.get("/getWeathertoronto").then(response =>{
    this.setState({
        weather:response.data.temp_c
    });

    // console.log("helloo ",response);
});
};


render(){
    return(
        <div>
            {this.state.weather}
        </div>
    );
    }

}