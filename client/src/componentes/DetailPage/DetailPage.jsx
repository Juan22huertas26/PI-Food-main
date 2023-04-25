import styles from './DetailPage.module.css'
import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loader from '../HomePage/cargando.gif';
import { getDetail } from '../../Redux/action';

const DetailPage = () => {
  const {id} = useParams();
    const {detail, loading} = useSelector(state => state)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getDetail(id))
    }, [dispatch, id])
    const regExp = /<[^>]*>/g;
    return (
      <div className={styles.container}>
        <NavLink className={styles.casa} to='/home'>
          🏚️
        </NavLink>
        {loading ? <div className={styles.loader}><img src={loader} alt='Loading'/> </div> :
          (<div className={styles.data}>
            <h1>{detail.title}</h1>
            <img src={detail.image} alt={detail.title} />
            <h4 className={styles.hs}>HealthScore: {detail.healthScore}</h4>
            <h3>Resumen</h3>
            {/*reemplaso todas las etiquetas html del resumen*/}
            <p>{detail.summary?.replace(regExp, "")}</p>
            <h3>Los Pasos</h3>
             {detail.steps ? (
               // LO MISMO PARA LOS PASOS
             <p>{detail.steps.replace(regExp, "")}</p>
            ) : <p>el resumen de esta reseta es confidencial lo siento</p>}
            {/*DEVUELVO UNA LISTA DE DIETAS CON LA PRIMERA LETRA EN MAYUSCULA */}
        <h4 className={styles.diets}>Diets: {detail.diets?.map((diet, i) => <li key={i}>{diet.name.charAt(0).toUpperCase() + diet.name.slice(1)}</li>)}</h4>
        </div>)}
      </div>
    );
}

export default DetailPage;