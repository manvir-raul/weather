import React, { Component } from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/weather";

const Api_key = "e00eafb564c3e3c10afc20e113231972";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      temperature:undefined,
      city:undefined,
      country:undefined,
      humidity:undefined,
      description:undefined,
      error:undefined
    }
  }
  getWeather = async e => {
    
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const dataApi = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=e00eafb564c3e3c10afc20e113231972&units=metric`)
    console.log(dataApi);
    
    if(city && country && dataApi.status===200){
      const data = await dataApi.json();
      this.setState({
          temperature:data.main.temp,
          city:data.name,
          country:data.sys.country,
          humidity:data.main.humidity,
          description:data.weather[0].description,
          Manvir:"manvir",
          error:""
        }) 
        } else if(dataApi.status===404 && city && country){
          this.setState({
            temperature:undefined,
            city:undefined,
            country:undefined,
            humidity:undefined,
            description:undefined,
            error:"Please enter correct city and country"
          })
        }else {
          this.setState({
            temperature:undefined,
            city:undefined,
            country:undefined,
            humidity:undefined,
            description:undefined,
            error:"Please enter city and country"
          })
        }
  };

  render() {
    
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles/>
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather data={this.state}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
        