import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllDogs } from '../actions'
import { Card } from './Card'

const Cards = ({allDogs}) => {
    const dispatch = useDispatch();
    const nameDog = useSelector( state => state.name )

    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])
    console.log("GETALLDOGS",getAllDogs)
    return (
        <div>

            {
                nameDog.length ? nameDog.map ((e, i) =>{
                    return (
                        <div key={i}>
                            <Link to={`/home/${e.id}`}>
                                <Card 
                                key={e.id} 
                                name={e.name}
                                image={e.image} 
                                temperament={e.temperament} 
                                weight_min={e.weight_min} 
                                weight_max={e.weight_max}
                                />
                            </Link>
                        </div>
                    )
                })
                :
                allDogs.map((e, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/home/${e.id}`}>
                                <Card 
                                key={e.id} 
                                name={e.name}
                                image={e.image} 
                                temperament={e.temperament} 
                                weight_min={e.weight_min} 
                                weight_max={e.weight_max}
                                />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cards;