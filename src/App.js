import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [size, setSize] = useState(5);
  const [pressedButton, setPressedButton] = useState(false);
  const [tableArray, setTableArray] = useState([]);
  const [bombCount, setBombCount] = useState(5);

  useEffect(() => {
    setTableArray(createTableArray(size));
  }, [size]);

  const createTableArray = (size) => {
    var sizeArray = [];
    var numBomb = bombCount;
    const bomb = "bomb";

    for (var i = 0; i < size; i++) {
      var innerArray = [];
      for (var j = 0; j < size; j++) {
        var bombProb = Math.random();
        if (numBomb !== 0 && bombProb > 0.75) {
          innerArray.push(bomb);
          numBomb = numBomb - 1;
        } else {
          innerArray.push(0);
        }
      }
      sizeArray.push(innerArray);
    }

    for (var k = 0; k < size; k++) {
      for (var l = 0; l < size; l++) {
        if (sizeArray[k][l] === bomb) {
          // horizontals and verticals
          if (k !== 0 && sizeArray[k - 1][l] !== bomb) {
            sizeArray[k - 1][l] = sizeArray[k - 1][l] + 1;
          }
          if (l !== 0 && sizeArray[k][l - 1] !== bomb) {
            sizeArray[k][l - 1] = sizeArray[k][l - 1] + 1;
          }
          if (k !== size - 1 && sizeArray[k + 1][l] !== bomb) {
            sizeArray[k + 1][l] = sizeArray[k + 1][l] + 1;
          }
          if (l !== size - 1 && sizeArray[k][l + 1] !== bomb) {
            sizeArray[k][l + 1] = sizeArray[k][l + 1] + 1;
          }
          // diagonals
          if (k !== 0 && l !== 0 && sizeArray[k - 1][l - 1] !== bomb) {
            sizeArray[k - 1][l - 1] = sizeArray[k - 1][l - 1] + 1;
          }
          if (k !== size - 1 && l !== 0 && sizeArray[k + 1][l - 1] !== bomb) {
            sizeArray[k + 1][l - 1] = sizeArray[k + 1][l - 1] + 1;
          }
          if (
            l !== size - 1 &&
            k !== size - 1 &&
            sizeArray[k + 1][l + 1] !== bomb
          ) {
            sizeArray[k + 1][l + 1] = sizeArray[k + 1][l + 1] + 1;
          }
          if (k !== 0 && l !== size - 1 && sizeArray[k - 1][l + 1] !== bomb) {
            sizeArray[k - 1][l + 1] = sizeArray[k - 1][l + 1] + 1;
          }
        }
      }
    }
    return sizeArray;
  };

  const createTable = (tableArray) => {
    return tableArray.map((row) => {
      return (
        <tr>
          {row.map((column) => {
            return <td style={{ textAlign: "center" }}>{column}</td>;
          })}
        </tr>
      );
    });
  };

  const buttonPress = (size) => {
    setPressedButton(!pressedButton);
    setSize(size);
  };

  const placeBomb = (numBomb) => {
    // setBombCount(bombCount - 1);
    return numBomb - 1;
  };

  return (
    <div className="App">
      {!pressedButton && (
        <div>
          Choose your difficulty
          <Button variant="primary" onClick={() => buttonPress(5)}>
            Easy
          </Button>
          <Button variant="primary" onClick={() => buttonPress(10)}>
            Medium
          </Button>
          <Button variant="primary" onClick={() => buttonPress(20)}>
            Hard
          </Button>
        </div>
      )}
      <Table>
        <tbody>{createTable(tableArray)}</tbody>
      </Table>
    </div>
  );
}

export default App;
