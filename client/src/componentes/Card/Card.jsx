import styles from './Card.module.css';
import { Link } from "react-router-dom";

const Card = (props) => {
    
    const { name, image, healthScore, diets } = props
    return(
        <Link to={`/home/${props.id}`} style={{textDecoration:'none'}}>
        <div key={props.id} className={styles.card}>
        <h6>{healthScore}</h6>
        <img src={image} alt={name} className={styles.image}/>
        <h3>{name}</h3>
        <br />
        
        {diets.map((e, i) =>  (<li key={i}>{e}</li>))}
    </div>
        </Link>
    )
}

export default Card;