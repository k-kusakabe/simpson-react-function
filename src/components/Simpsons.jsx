import Character from "./Character";

const Simpsons = (props) => {
  const { simpsons, onLikeToggle, onDelete } = props;

  return (
    <>
      {simpsons.map((item, index) => {
        return (
          <Character
            item={item}
            key={item.id}
            onDelete={onDelete}
            onLikeToggle={onLikeToggle}
          />
        );
      })}
    </>
  );
};

export default Simpsons;

// import React, { Component } from "react";
// import Character from "./Character";

// class Simpsons extends Component {
//   render() {
//     const { simpsons, onDelete, onLikeToggle } = this.props;

//     return (
//       <>
//         {simpsons.map((item, index) => {
//           return (
//             <Character
//               item={item}
//               key={item.id}
//               onDelete={onDelete}
//               onLikeToggle={onLikeToggle}
//             />
//           );
//         })}
//       </>
//     );
//   }
// }

// export default Simpsons;
