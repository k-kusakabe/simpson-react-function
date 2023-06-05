import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";

const App = () => {
  const [simpsons, setSimpsons] = useState();

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
      );

      //fixed the api data to have unique id
      data.forEach((element, index) => {
        element.id = index + Math.random();
      });

      setSimpsons(data);
    } catch (error) {
      console.log(error);
    }
  };

  //get API data
  useEffect(() => {
    getData();
  }, []);

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

  if (!simpsons) return <Loading />;

  if (simpsons.length === 0) return <p>You deleted everything!</p>;

  //calculate the total
  let total = 0;
  simpsons.forEach((char) => {
    if (char.liked) total++;
  });

  return (
    <>
      <h1>Total no of liked chars #{total}</h1>
      <Simpsons
        simpsons={simpsons}
        onLikeToggle={onLikeToggle}
        onDelete={onDelete}
      />
    </>
  );
};

export default App;

// import React, { Component } from "react"<></>;
// import axios from "axios";
// import Loading from "./components/Loading";
// import Simpsons from "./components/Simpsons";
// import "./App.css";

// class App extends Component {
//   state = {};

//   async componentDidMount() {
//     const { data } = await axios.get(
//       `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
//     );

//     //fixed the api data to have unique id
//     data.forEach((element, index) => {
//       element.id = index + Math.random();
//     });

//     this.setState({ simpsons: data });
//   }

//   onLikeToggle = (id) => {
//     const indexOf = this.state.simpsons.findIndex((char) => {
//       return char.id === id;
//     });
//     const simpsons = [...this.state.simpsons];
//     //invert if liked or not liked
//     simpsons[indexOf].liked = !simpsons[indexOf].liked;
//     this.setState({ simpsons });
//   };

//   onDelete = (id) => {
//     const indexOf = this.state.simpsons.findIndex((char) => {
//       return char.id === id;
//     });
//     const simpsons = [...this.state.simpsons];
//     simpsons.splice(indexOf, 1);
//     this.setState({ simpsons });
//   };

//   render() {
//     const { simpsons } = this.state;

//     if (!simpsons) return <Loading />;

//     if (simpsons.length === 0) return <p>You deleted everything!</p>;

//     //calculate the total
//     let total = 0;
//     simpsons.forEach((char) => {
//       if (char.liked) total++;
//     });

//     return (
//       <>
//         <h1>Total no of liked chars #{total}</h1>
//         <Simpsons
//           simpsons={simpsons}
//           onDelete={this.onDelete}
//           onLikeToggle={this.onLikeToggle}
//         />
//       </>
//     );
//   }
// }

// export default App;
