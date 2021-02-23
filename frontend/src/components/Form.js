import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [teste, setTeste] = useState({
    name: "",
    age: "",
    contact: "",
    reason: "",
    hour: "",
    date: "",
  });
  const [hours, setHours] = useState([]);

  //09:20 ate as 16:40
  const availableHours = [
    "09:20",
    "09:40",
    "10:00",
    "10:20",
    "10:40",
    "11:00",
    "11:20",
    "11:40",
    "12:00",
    "12:20",
    "12:40",
    "13:00",
    "13:20",
    "13:40",
    "14:00",
    "14:20",
    "14:40",
    "15:00",
    "15:20",
    "15:40",
    "16:00",
    "16:20",
    "16:40",
  ];

  // useEffect(() => {
  //   getHours();
  // }, []);

  //events handlers
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTeste({ ...teste, [name]: value });
  };
  ////////// //////////
  const handleDate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    axios.get("http://localhost:5000/marcacoes").then((res) => {
      const marcacoes = res.data;

      const diaMarcacao = marcacoes.filter((data) => data.date === value);

      const horasIndisp = [];
      let horasDisp = [];

      diaMarcacao.map((hour) => horasIndisp.push(hour.hour));

      horasDisp = availableHours.filter((e) => !horasIndisp.includes(e));

      setHours(horasDisp);
      setTeste({ ...teste, [name]: value });
    });
  };

  const handleSintomas = (e) => {
    const value = e.target.value;

    setTeste({ ...teste, reason: value });
  };

  const handleHours = (e) => {
    const value = e.target.value;

    setTeste({ ...teste, hour: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeste = { ...teste };

    if (teste.name === "") {
      alert("name nao pode estar vazio");
      return false;
    } else if (teste.age === "") {
      alert("idade nao pode estar vazio");
      return false;
    } else if (teste.contact === "") {
      alert("contacto nao pode estar vazio");
      return false;
    } else if (teste.reason === "") {
      alert("Motivo nao pode estar vazio");
      return false;
    } else if (teste.date === "") {
      alert("Data nao pode estar vazio");
      return false;
    } else if (teste.hour === "") {
      alert("hora nao pode estar vazio");
      return false;
    } else {
      axios
        .post("http://localhost:5000/marcacoes/add", newTeste)
        .then((res) => {
          window.location.replace = "/"; //?????
        })
        .catch((err) => console.log(err));
    }

    setTeste({
      name: "",
      age: "",
      contact: "",
      reason: "",
      hour: "",
      date: new Date(),
    });
  };

  return (
    <>
      <div className="main-container">
        <div className="form-container">
          <div className="form-group">
            <form>
              <div className="form-element">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={teste.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label htmlFor="age">Idade</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={teste.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label htmlFor="contact">Contacto</label>
                <input
                  type="tel"
                  pattern="[0-9]{9}"
                  id="contact"
                  name="contact"
                  value={teste.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-element">
                <label htmlFor="reason">Motivo</label>
                <select
                  onChange={handleSintomas}
                  id="validationCustom04"
                  required
                >
                  <option selected disabled value="">
                    Escolha o Motivo
                  </option>
                  <option name="reason">Sintomas</option>
                  <option name="reason">Contacto Proximo</option>
                </select>
              </div>

              <div className="form-element">
                <label htmlFor="date">Data</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={teste.date}
                  onChange={handleDate}
                />
              </div>

              <div className="form-element">
                <label htmlFor="hours">Horas</label>
                <select id="hours" onChange={handleHours}>
                  <option defaultValue selected disabled>
                    Escolha uma hora
                  </option>
                  {hours.map((hour) => {
                    return (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="comment">
                <div className="form-element">
                  <label htmlFor="comment">Observações</label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="comment"
                    name="comment"
                    rows="5"
                    // value={teste.name}
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="btn-container">
                <button className="button" type="submit" onClick={handleSubmit}>
                  Confirmar Marcação
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
