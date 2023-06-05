import React from "react";

const Delete = (props) => {
  const { onDelete, id } = props;
  return (
    <div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Delete;

// import React, { Component } from "react";

// class Delete extends Component {
//   render() {
//     const { onDelete, id } = this.props;

//     return (
//       <div>
//         <button onClick={() => onDelete(id)}>Delete</button>
//       </div>
//     );
//   }
// }

// export default Delete;
