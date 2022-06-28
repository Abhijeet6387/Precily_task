import React, { useEffect, useState } from "react";
import Split from "react-split-it";
import img from "../images/img.png";
import "./Home.css";
import axios from "axios";
export default function Home() {
  const [radioOption, setRadioOption] = useState("add");
  const [count, setCount] = useState(0);
  const [selectedInd, setSelectedInd] = useState(null);
  const [itemList, setItemList] = useState(null);
  const [newItem, setNewItem] = useState({ description: "", totalUpdates: 0 });

  function fetchData() {
    axios
      .get("/route/get")
      .then((res) => {
        setItemList(res.data);
        console.log("fetched", res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, [count]);

  const handleRadioOptionChange = (e) => {
    setRadioOption(e.target.value);
  };

  const handleNewItemChange = (e) => {
    if (radioOption === "add")
      setNewItem({ description: e.target.value, totalUpdates: 0 });
    else {
      if (selectedInd === "")
        alert("Please mention index of item you want to update");
      else {
        setNewItem({
          description: e.target.value,
          totalUpdates: itemList[selectedInd].totalUpdates + 1,
        });
      }
    }
  };

  const handleSelectedIndChange = (e) => {
    setSelectedInd(e.target.value);
    console.log(selectedInd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let link;
    if (radioOption === "add") link = "/route/add";
    else link = "/route/update/" + itemList[selectedInd]._id;

    axios
      .post(link, newItem)
      .then((res) => {
        setCount(count + 1);
        setNewItem({ description: "", totalUpdates: 0 });
        setSelectedInd("");

        alert("Success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ height: "100vh" }}>
      {itemList && (
        <Split direction="vertical">
          <div style={{ height: "100%" }}>
            <Split>
              <div className="div1" style={{ height: "100%", padding: "2em" }}>
                <h5>
                  Count Of{radioOption === "add" ? " Add: " : " Update: "}
                  <label for="count">
                    {radioOption === "add"
                      ? itemList.length
                      : itemList.reduce((prevValue, curItem) => {
                          return prevValue + curItem.totalUpdates;
                        }, 0)}
                  </label>
                </h5>
                <form>
                  <input
                    type="radio"
                    id="add"
                    name="addORupdate"
                    value="add"
                    checked={radioOption === "add"}
                    onChange={handleRadioOptionChange}
                  />
                  <label for="add" className="pl-2 pr-3">
                    Add{" "}
                  </label>
                  <input
                    type="radio"
                    id="update"
                    name="addORupdate"
                    value="update"
                    checked={radioOption === "update"}
                    onChange={handleRadioOptionChange}
                  />
                  <label for="update" className="pl-2 pr-3">
                    Update
                  </label>
                  <br></br>
                  {radioOption === "update" && (
                    <div>
                      <p className="text-muted">
                        Enter the index of the entry you want to update!
                      </p>
                      <label for="Id">Index:</label>
                      <br />
                      <input
                        type="text"
                        id="id"
                        name="id"
                        value={selectedInd}
                        onChange={handleSelectedIndChange}
                        placeholder="Enter Value"
                      />
                    </div>
                  )}
                  <br></br>
                  <label for="desc">Description</label>
                  <input
                    type="text"
                    className="txtarea"
                    value={newItem.description}
                    onChange={handleNewItemChange}
                    placeholder="Type Something Here!"
                  />

                  <div>
                    {radioOption === "add" ? (
                      <button
                        className="btn btn-sm btn-primary mt-3"
                        onClick={handleSubmit}
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary mt-3"
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div style={{ height: "100%" }} className="div2">
                <p className="para" style={{ padding: "20px" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque natus, tempora nostrum placeat unde accusamus nisi
                  culpa quidem tempore atque eaque aperiam quam voluptates odio?
                  Esse qui necessitatibus debitis. Quae. Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Explicabo sed est culpa,
                </p>
                <img
                  src={img}
                  alt="img1"
                  className="center"
                  style={{ width: "200px" }}
                />
              </div>
            </Split>
          </div>
          <div style={{ height: "100%" }} className="div3">
            <div>
              <div style={{ padding: "20px" }}>
                <div className="card">
                  <div className="card-header">List Of Entries</div>
                  <div className="card-body">
                    {itemList.length > 0 &&
                      itemList.map((cur, i) => (
                        <p>
                          <b>{i + ". "}</b>
                          {cur.description}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Split>
      )}
      {!itemList && <p>Loading...</p>}
    </div>
  );
}
