import styles from './NavBar.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import image from '../../fondo2.jpg'
import SearchBar from '../SearchBar/SearchBar'
import logout from '../Landing_page/vegetales-puestos-izquierda-pizarra-negra.jpg'

export default function NavBar(){
    const {pathname } = useLocation()
    return(
        <div className={styles.nav}>
            <NavLink to='/'>
                <img src={logout} alt="logout" />
            </NavLink>
            <NavLink to='/home'>
                {pathname !== '/home' && <img src={image} alt="toHome" />}
            </NavLink>
            <br />
            <div className={styles.botones}>
                <NavLink to='/createfood'>
                    {pathname === '/createfood' || <button>New Recipe</button>} 
                </NavLink>
                <NavLink to='/about'>
                    {pathname !== '/about' &&  <button>About</button>}                    
                </NavLink>
            </div>
            <div className={styles.searchbar}>
                {pathname !== '/createfood' && pathname !== '/about' ? <SearchBar/> : null}
            </div> 
       </div>
    )
}