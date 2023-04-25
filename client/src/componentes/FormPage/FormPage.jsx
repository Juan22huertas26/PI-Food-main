import styles from "./FormPage.module.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validaciones";
import { addRecipe } from "../../Redux/action";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logout from '../../fondo2.jpg'

const FormPage = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);
  const [diet, setDiet] = useState([]);
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: 1,
    steps: "",
    diets: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: 1,
    steps: "",
    diets: [],
  });
  const inputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
    setErrors(
      validation({
        ...recipe,
        [name]: value,
      })
    );
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(addRecipe(recipe));
    alert("🔥Felicidades la receta se creo correctamente🔥");
    navigate("/home");
  };
  const mapDiets = () => {
    const filtered = diets.filter((d) => !diet.includes(d.name));
    return filtered.map((di, i) => {
      return (
        <option value={di.name} key={i}>
          {di.name}
        </option>
      );
    });
  };
  const dietHandler = (event) => {
    if (event.target.value) {
      setDiet([...diet, event.target.value]);
      setRecipe({ ...recipe, diets: [...diet, event.target.value] });
      event.target.value = "aqui las dietas";
    }
  };
  const deleteDiet = (event) => {
    setDiet(diet.filter((d) => d !== event));
    setRecipe({
      ...recipe,
      diets: recipe.diets.filter((d) => d !== event),
    });
  };
  return (
    <div className={styles.container}>
      <NavLink className={styles.nav} to='/home'>
                <img src={logout} alt="logout" />
            </NavLink>
      <form onSubmit={handlerSubmit}>
        <label>Titulo: </label>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={inputChange}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        <label>Imagen: </label>
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={inputChange}
        />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
        <label>Resumen: </label>
        <textarea
          type="text"
          name="summary"
          value={recipe.summary}
          onChange={inputChange}
        />
        {errors.summary && <p className={styles.error}>{errors.summary}</p>}
        <label>Dietas: </label>
        <select
          onChange={dietHandler}
          name="diets"
          defaultValue="aqui las dietas"
        >
          <option disabled value="aqui las dietas">
          Aqui las dietas
          </option>
          {mapDiets()}
        </select>
        <div className={styles.formDiets}>
          {diet?.map((d, i) => {
            return (
              <button key={i} type="button" onDoubleClick={() => deleteDiet(d)}>
                {d}
              </button>
            );
          })}
        </div>
        {errors.diets && <p className={styles.error}>{errors.diets}</p>}
        <label>Puntuasion de salud: </label>
        <input
          id="range-input"
          name="healthScore"
          type="range"
          min="1"
          max="100"
          value={recipe.healthScore}
          onChange={inputChange}
        />
        <>{recipe.healthScore}</>
        <label>Pasos a: </label>
        <textarea
          type="text"
          name="steps"
          value={recipe.steps}
          onChange={inputChange}
        />
        {errors.steps && <p className={styles.error}>{errors.steps}</p>}
        {!errors.title &&
        !errors.image &&
        !errors.summary &&
        !errors.healthScore &&
        !errors.steps &&
        diet.length >= 1 ? (
          <button className={styles.createButton}>Create</button>
        ) : (
          <button disabled className={styles.disabledButton}>
            Create
          </button>
        )}
      </form>
    </div>
  )
}

export default FormPage;