import { React } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../actions";
import { Link } from "react";
import { getAllTemperaments } from "../actions";

export default function Home() {
    
const dispatch = useDispatch();
const allDogs = useSelector((state) => state.dogs)
const temperaments = useSelector(state => state.temperaments);

useEffect(() => {
    dispatch(getAllTemperaments())
}, [dispatch]);

useEffect ( ()=> {
    //lo mismo que mapDispatchToProps
    dispatch(getAllDogs())
}, [dispatch])
/**
 *  
 */ 

function handleClick(e){
    e.preventDefault();
    dispatch(getAllDogs());
}

return (
    <div>
    <Link to= '/dogs'>Agregar nueva raza</Link>
    <h1>--PupPIes--</h1>
    <button onClick={ e=> { handleClick(e) } }>
        🔄️  RELOAD  🔄️ 
    </button>
    <div>
        {/* <select onChange={(e) => filterAllTemperaments(e)}>
                    <option value='Ninguno'>Ninguno</option>
                    {
                        temperaments?.map((e,i) => {
                            return (
                                <option key={i} value={e.name}>{e.name}</option>
                            )
                        })
                    }
        </select> */}
        {/* <select onChange={(e) => filterAllDogs(e)}>
        <option value='Ninguno'>Ninguno</option>
                    
        </select> */}
        <option value='All'>Todos</option>
        <option value='created'>Creados</option>
        <option value='api'>Existente</option>
        <select>
            <options value = 'asc'>Ascendente</options>
            <options value = 'desc'>Descendente</options>
        </select>
    {/* {
        allDogs && allDogs.map(e=>{
            <Card name={e.name} image={e.img} temperament={e.temperament} weight={e.weight}/>
        })
    } */}
    </div>
    </div>
)


}