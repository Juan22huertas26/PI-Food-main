import styles from './About.module.css'
import linkin from './icon-in.png';
import yo from "./juanhuertas2.jpg";
import git from "./icon-git.png";
import logout from '../../fondo2.jpg'
import { NavLink } from 'react-router-dom';



const About = () => {
    return(
        <div className={styles.contenedor}>
          <NavLink className={styles.nav} to='/home'>
                <img src={logout} alt="logout" />
            </NavLink>
            <div className={styles.carta}>
                <img className={styles.yo} src={yo} alt="juan" />
                <h1>Juan Pablo Huertas Pabon</h1>
                <a href="https://www.linkedin.com/in/juan-huertas-856658265/">
                    <img className={styles.link} src={linkin} alt="linkedin" />
                </a>
                <a href="https://github.com/Juan22huertas26">
                    <img className={styles.git} src={git} alt="github" />
                </a>
            </div>
            <div className={styles.api}>
                <h1>Esta aplicacion a sido desarrollada con:</h1>
            </div>
            <div className={styles.li1}>
              <li>
                <strong>* FrontEnd *</strong>
              </li>
              <li>React</li>
              <li>React-Redux</li>
              <li>CSS</li>
            </div>
            <div className={styles.li2}>
              <li>
                <strong>* BackEnd *</strong>
              </li>
              <li>NodeJs</li>
              <li>ExpressJs</li>
            </div>
            <div className={styles.li3}>
              <li>
                <strong>* Base de Datos *</strong>
              </li>
              <li>PostgreSql</li>
              <li>Sequelize</li>
            </div>
        </div>
    );
  }

export default About;