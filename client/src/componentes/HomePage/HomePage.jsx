import styles from './HomePage.module.css';
import Card from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import loader from './cargando-unscreen.gif'
import Paginado from '../Paginado/Paginado'
import { getAllRecipes, getDiets, filterRecipeByDiets, filterByOrigin, deleteFilters, orderRecipeAlphabetic, healthScoreOrder } from '../../Redux/action'



export default function HomePage(){
    const { myRecipes, loading, diets } = useSelector((state) => state)
    const dispatch = useDispatch();
    //hace un llamado a la accion cuando el componente se monte
    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);
    //aqui igual soloo si la lista de dietas esta vaica
    useEffect(() => {
        if(!diets.length){
            dispatch(getDiets())
        }
    }, [dispatch, diets])
    //aqui se calcula lo necesario para la paginacion de las recetas
    const [page, setPage] = useState(1);
    const finalPage = page * 9;
    const startPage = finalPage - 9;
    const actualPage = myRecipes?.slice(startPage, finalPage)
    const totalPages = Math.ceil(myRecipes.length / 9);

    const handlerPrevPage = () => {
        setPage(page - 1);
    };
    const handlerNextPage = () => {
        setPage(page + 1);
    };
    const handlerPageNumber  = (n) => {
        setPage(n);
    };
    const filterHandler = (event) => {
        const { name, value } = event.target;
        if(name === "Diets"){
            dispatch(filterRecipeByDiets(value));
            setPage(1)
        }else{
            dispatch(filterByOrigin(value));
        }
        if(value === 'All'){
            dispatch(deleteFilters())
            setPage(1)
        }
    };
    const orderHandler = (event) => {
        const { name, value } = event.target;
        if(name === 'Alphabetic'){
            dispatch(orderRecipeAlphabetic(value))
        }else{
            dispatch(healthScoreOrder(value));
        }
    };
    const reset = () => {
      window.location.reload()
    };
    return(
        <div>
      <div className={styles.options}>
        <select name="Origin" onChange={filterHandler} defaultValue='Filter By Origin'>
          <option disabled >Filter By</option>
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="DataBase">DataBase</option>
        </select>
        <select name="Diets" onChange={filterHandler} defaultValue='Filter By Diets'>
          <option disabled >Filter By</option>
          <option value="All">All</option>
          {diets?.map((diet) => {
            return (
              <option value={diet.name} key={diet.id}>
                {diet.name}
              </option>
            );
          })}
        </select>
        <select name="Alphabetic" onChange={orderHandler} defaultValue='Alphabetic Order'>
          <option disabled >Order By</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select name="HealthScore" onChange={orderHandler} defaultValue='HealthScore Order'>
          <option disabled > Order By</option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
      <button onClick={reset}>RefreshPag</button>
      </div>
      <br />
      <div className={styles.paginado}>
        <Paginado
          totalPages={totalPages}
          page={page}
          prevPage={handlerPrevPage}
          nextPage={handlerNextPage}
          pageNumber={handlerPageNumber}
        />
        </div>
        <div className={styles.contenedor}>
        {loading ? (
          <div  className={styles.loader}>
            <img src={loader} alt="Loading"/>
          </div>
          
          ) 
          : actualPage.length > 0 ? (
          actualPage.map((recipe) => {
            return (
              <div key={recipe.id}>
                <Card
                  id={recipe.id}
                  name={recipe.title}
                  image={recipe.image}
                  diets={recipe.diets}
                  healthScore={recipe.healthScore}
                />
              </div>
            );
          })
        ) : (
          <h2>
            Problemas en la matrix 👾
          </h2>
        )}
        </div>
    </div>
    )
}