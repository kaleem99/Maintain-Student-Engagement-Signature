import logo from "./logo.svg";
import "./App.css";
import { db } from "./config/database";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
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
    setTimeout(() => {
      let allInputElements = document.querySelectorAll(".inputElement");
      let element = allInputElements[allInputElements.length - 1];
      element.scrollIntoView();
    }, 500);
    // console.log(element, "Element");
  };
  const openWindowTab = (index, programLink, idElem) => {
    window.open(programLink);
    let allElements = document.querySelectorAll(`#${idElem}`);
    allElements.forEach((elem, i) => {
      if (i === index) {
        elem.style.color = "blue";
      } else {
        elem.style.color = "black";
      }
    });
  };
  return (
    <div className="App">
       <div className="ButtonDivs">
          <button onClick={() => AddNewRow()} className="SaveButton">
            Add New Row
          </button>
          <button onClick={() => updateData()} className="SaveButton">
            Save Content
          </button>
          <br></br>
        </div>
      <div className="Content">
       
        {/* <br></br> */}
        <table>
          <tr>
            <th>Program Number</th>
            <th>Program</th>
            <th>Unsubscribe Link</th>
          </tr>
          {data.map((item, i) => {
            const arrOfItems = Object.entries(item);
            const programName = arrOfItems[0][0];
            const programLink = arrOfItems[0][1];
            return (
              <tr>
                <td>{i + 1}</td>
                <td
                >
                  <input
                    // disabled={"true"}
                    onChange={(e) =>
                      updateStateData(e.target.value, "Program", i)
                    }
                    value={programName}
                    className="inputElement"
                    placeholder="Program Name"
                  />
                </td>
                <td
                >
                  <input
                    onChange={(e) => updateStateData(e.target.value, "Link", i)}
                    className="inputElement"
                    value={programLink}
                    placeholder="Unsubscribe Link"
                    id="UnsubscribeLink"
                  />
                  <div
                    onClick={(e) =>
                      openWindowTab(i, programLink, "UnsubscribeLink")
                    }
                    className="testUrlLink"
                  >
                    <BsArrowRightCircleFill />
                  </div>
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
