import './App.css';
import { useState } from 'react';

function App() {
  const GetData = () => {
    const getItem = localStorage.getItem("Project")
    if (getItem) {
      return JSON.parse(getItem)
    } else {
      return []
    }
  }
  const [stor, setStor] = useState(GetData())
  const [inputData, setInputData] = useState({
    project: "",
    detail: "",
    color: false
  })
  const inputHendler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
    console.log(inputData)
  }
  const send = () => {
    if (inputData !== "") {
      setStor([
        ...stor,
        {
          id: stor.length + 1,
          project: inputData.project,
          detail: inputData.detail,
          color: inputData.color
        }
      ])
    }
    localStorage.setItem("Project", JSON.stringify(stor))
  }
  const Update = (index) => {
    const updatedStor = [...stor];
    if (updatedStor[index].color === false) {
      updatedStor[index].color = true;
    } else if (updatedStor[index].color === true) {
      updatedStor[index].color = false;
    }
    setStor(updatedStor);
    localStorage.setItem("Project", JSON.stringify(updatedStor));
  }
  return (
    <div className="App">
      <div className='input'>
        <input type="text" name='project' placeholder='Project Name' onChange={inputHendler} />
        <input type="text" name='detail' placeholder='Project Detail' onChange={inputHendler} />
        <button onClick={send}> Set Project  </button>
      </div>
      <div className='map'>
        <div className='row'>
          {
            stor.map((item, index) =>
              <div className='col-3'>
                <div className="box">
                  <div className={item.color ? "green" : "red"} key={index}>
                    <h3>{item.project}</h3>
                    <p>{item.detail}</p> 
                      <button className='mapBtn' onClick={() => Update(index)}>Edit</button> 
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
