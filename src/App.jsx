import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";
import Joi from "joi";

const App = () => {
  const [simpsons, setSimpsons] = useState();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [errors, setErrors] = useState(null); //null means no error;

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=15&character=${search}`
      );

      //fixed the api data to have unique id
      data.forEach((element, index) => {
        element.id = index + Math.random();
      });

      setSimpsons(data);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  //get API data
  useEffect(() => {
    getData();
  }, [getData]);

  const onLikeToggle = (id) => {
    const indexOf = simpsons.findIndex((char) => {
      return char.id === id;
    });
    const _simpsons = [...simpsons];
    //invert if liked or not liked
    _simpsons[indexOf].liked = !_simpsons[indexOf].liked;
    setSimpsons(_simpsons);
  };

  const onDelete = (id) => {
    const indexOf = simpsons.findIndex((char) => {
      return char.id === id;
    });
    const _simpsons = [...simpsons];
    _simpsons.splice(indexOf, 1);
    setSimpsons(_simpsons);
  };

  // added valiation by joi
  const onInput = async (e) => {
    setSearch(e.target.value);

    //define schema
    const schema = { search: Joi.string().regex(/^[a-zA-Z0-9\s]+$/) };

    // call joi
    const r = Joi.object(schema);

    try {
      const results = await r.validateAsync({ search: e.target.value });
      setErrors(null);
    } catch (errors) {
      setErrors(errors);
    }
  };

  const onSort = (e) => {
    setSort(e.target.value);
  };

  if (!simpsons) return <Loading />;

  //calculate the total
  let total = 0;
  simpsons.forEach((char) => {
    if (char.liked) total++;
  });

  let _simpsons = [...simpsons];

  //sort by name
  if (sort === "asc") {
    _simpsons.sort((itemOne, itemTwo) => {
      if (itemOne.character > itemTwo.character) return 1;
      if (itemOne.character < itemTwo.character) return -1;
    });
  } else if (sort === "desc") {
    _simpsons.sort((itemOne, itemTwo) => {
      if (itemOne.character > itemTwo.character) return -1;
      if (itemOne.character < itemTwo.character) return 1;
    });
  }

  return (
    <>
      <h1>Total no of liked chars #{total}</h1>
      <input onInput={onInput} type="text" />
      <select onInput={onSort}>
        <option value=""></option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <p>{simpsons.length === 0 && "There is no result!"}</p>
      <p>{search && errors && "You can enter only A-Z & 0-9"}</p>
      <Simpsons
        simpsons={_simpsons}
        onLikeToggle={onLikeToggle}
        onDelete={onDelete}
      />
    </>
  );
};

export default App;
