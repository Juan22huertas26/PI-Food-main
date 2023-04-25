import { NavLink } from "react-router-dom";
import style from './Landing_Page.module.css';


const LandingPage = () => {
    return(
        <div className={style.contenedor} >
            <div className={style.h1} >
                <h1>
                    PI Henry Food
                </h1>
            </div>
            <div className={style.h4} >
                        <h2>¡Bienvenido!</h2>
                <p>
                "La cocina es un arte que mezcla sabores, 
                  aromas y colores para crear platos que deleiten
                el paladar y satisfagan el alma."
                </p>
            </div>
            <div className={style.boton}>
            <NavLink to='/home' >
                <button className={style.sarten} >Time to cook!🍴</button>
            </NavLink>
            </div>
        </div>
    )
}

export default LandingPage;