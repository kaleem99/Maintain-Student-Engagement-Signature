import logo from "./logo.svg";
import "./App.css";
import { db } from "./config/database";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
function App() {
  useEffect(() => {
    fetchData();
  }, []);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const query = ref(db, "/");
      return onValue(query, (snapshot) => {
        const data = snapshot.val();
        const resultArr = [];
        for (let key in data) {
          const result = {};
          result[key] = data[key];
          resultArr.push(result);
        }
        setData(resultArr);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateData = () => {
    try {
      const query = ref(db, "/");
      const resultObject = {};
      for (let i = 0; i < data.length; i++) {
        const arrOfItems = Object.entries(data[i]);
        // console.log(arrOfItems[0][0])
        resultObject[arrOfItems[0][0]] = arrOfItems[0][1];
      }
      console.log(resultObject);
      set(query, resultObject);
      // console.log(resultObject);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(data);
  const updateStateData = (newContent, type, index) => {
    // console.log(data, index);
    const contentDataArr = [...data];
    const objectIndex = contentDataArr[index];
    const newObject = {};
    if (type === "Program") {
      newObject[newContent] = Object.values(objectIndex)[0];
    } else {
      const key = Object.keys(objectIndex)[0];
      newObject[key] = newContent;
    }
    // console.log(newObject);
    contentDataArr[index] = newObject;
    setData(contentDataArr);
    // console.log(contentDataArr[index]);
  };
  const AddNewRow = () => {
    const newResultArr = [...data];
    newResultArr.push({ "": "" });
    setData(newResultArr);
  };
  return (
    <div className="App">
      <div className="Content">
        <div>
          <button onClick={() => AddNewRow()} className="SaveButton">
            Add New Row
          </button>
          <button onClick={() => updateData()} className="SaveButton">
            Save Content
          </button>
          <br></br>
        </div>
        <br></br>
        <table>
          <tr>
            <th>Program Number</th>
            <th>Program</th>
            <th>Unsubscribe Link</th>
          </tr>
          {data.map((item, i) => {
            const arrOfItems = Object.entries(item);
            return (
              <tr>
                <td>{i + 1}</td>
                <td
                // onInput={(e) =>
                //   updateStateData(e.target.innerHTML, "Program", i)
                // }
                // contentEditable="true"
                >
                  <input
                    // disabled={"true"}
                    onChange={(e) =>
                      updateStateData(e.target.value, "Program", i)
                    }
                    value={arrOfItems[0][0]}
                    className="inputElement"
                    placeholder="Program Name"
                  />
                </td>
                <td
                // onInput={(e) =>
                //   updateStateData(e.target.innerHTML, "Link", i)
                // }
                // contentEditable="true"
                >
                  <input
                    onChange={(e) => updateStateData(e.target.value, "Link", i)}
                    className="inputElement"
                    value={arrOfItems[0][1]}
                    placeholder="Unsubscribe Link"
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
