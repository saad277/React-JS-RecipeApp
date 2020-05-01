import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


import Recipe from "./Components/Recipe"





const App = () => {

  const APP_ID = "a1ac9d48"
  const APP_KEY = "b94e2d665c7f0c472a6b43ab57bb177b"


  const [recipes, setRecipes] = useState();
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState("chicken")

  const getRecipes = async () => {

    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    console.log(data.hits)
    setRecipes(data.hits)
  }

  useEffect(() => {

    getRecipes();

  }, [query])

  const onSearchUpdate=(event)=>{

      console.log(event.target.value)
      setSearch(event.target.value)
  }

  const getQuery=(event)=>{

    event.preventDefault();

    setQuery(search)
    setSearch("")

  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getQuery}>
        <input type="text" className="search-bar" value={search} onChange={onSearchUpdate} />
        <button type="submit" className="search-button" type="submit">Search</button>
      </form>

      <div className="recipes">

      {recipes ? recipes.map((x, id) => {

        return (

          <Recipe 
          title={x.recipe.label} 
          calories={x.recipe.calories} 
          image={x.recipe.image}
          ingredients={x.recipe.ingredients}
          key={id}
          />
        )
      }) : null}

      </div>

    </div>
  );
}

export default App;
