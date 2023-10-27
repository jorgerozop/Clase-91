import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { axios } from 'axios'; 
export default class MeteorScreen extends Component {
    constructor(props) {
        super(props)
            this.state = {
                meteors:{},

            };
    }
    //Llamamos la función componentDidMount
    componentDidMount(){
        this.getMeteors();
    }
    //Obtener los datos de la APi de los asteroides
    getMeteors=()=>{
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=iXqbKl4cdBOeA7yWtuRnGhbgRfzC5NigwE5puJye")
            .then(response=>{
                this.setState({
                    meteors: response.data.near_earth_objects
                })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    render() {
        if(Object.keys(this.state.meteors).length === 0){
            return (
                <View
                    style ={ styles.meteorsView }>
                        <Text>
                            Cargando...
                        </Text>
                </View>
            )
        }else{
            let meteor_arr = Object.keys(this.state.meteors).map(meteors_date => {
                return this.state.meteors[meteors_date]
            })
            let meteors = [].concat.apply([],meteor_arr);
            meteors.forEach(function(element){
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min+
                    element.estimated_diameter.kilometers.estimated_diameter_max)/2
                let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
                element.threatScore = threatScoresss
            });
        }
        return (
            <View
                style={ styles.meteorsView }>
                <Text>Pantalla meteoritos</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    meteorsView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})