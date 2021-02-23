import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [futurasMarcacoes, setFuturasMarcacoes] = useState([]);

  useEffect(() => {
    getMarcacoes();
  }, []);

  const getMarcacoes = () => {
    axios.get("http://localhost:5000/marcacoes").then((res) => {
      const marcacoes = res.data;

      var sortHoras = marcacoes.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      sortHoras.sort((a, b) => {
        return new Date(a.hour).getTime() - new Date(b.hour).getTime();
      });

      setFuturasMarcacoes(sortHoras);
    });
  };

  const deleteMarcacao = (id) => {
    axios.delete(`http://localhost:5000/marcacoes/${id}`).then((res) => {
      console.log(res.data);
    });

    setFuturasMarcacoes(futurasMarcacoes.filter((marc) => marc._id !== id));
  };

  return (
    <>
      <div className="main-container">
        <div className="home-container">
          {futurasMarcacoes.map(
            ({ _id, name, age, contact, reason, date, hour }) => {
              return (
                <div key={_id} className="marcacao">
                  <p>
                    Nome: <span>{name}</span>
                  </p>
                  <p>Idade: {age}</p>
                  <p>Contacto: {contact}</p>
                  <p>Razão: {reason}</p>
                  <p>Data: {date}</p>
                  <p>Hora: {hour}</p>

                  <FaTrash
                    style={{ color: "red", cursor: "pointer", margin: "1.5em" }}
                    onClick={() => deleteMarcacao(_id)}
                  />

                  <Link
                    to={{
                      pathname: `/marcacao/${_id}`,
                      params: { age: age },
                    }}
                  >
                    <FaEdit
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        margin: "1.5em",
                      }}
                    />
                  </Link>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
