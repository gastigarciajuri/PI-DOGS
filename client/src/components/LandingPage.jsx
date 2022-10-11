import { React } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(params) {
    return(
        <div>
            <h1>Bienvenidos</h1>
            <Link to ='/home'>
                <button>--INGRESAR--</button>
            </Link>
        </div>
    )
}