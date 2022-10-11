import axios from 'axios';
import { GET_DOGS, GET_TEMPERS } from './const';

export function getAllDogs() {
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/dogs") 
        return dispatch({
        type: GET_DOGS,
        payload: json.data
        })
    }
}
export function getAllTemperaments(){
    return async function (dispatch) {
        const allTemperaments = await axios('"http://localhost:3001/temperaments"')
        return dispatch({
            type: GET_TEMPERS,
            payload: allTemperaments.data
        })
    }
}
