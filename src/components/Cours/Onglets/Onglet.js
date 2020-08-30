import React, { useState } from "react";
import CreateChap from "../Chapitres/createChap";

const Onglet = (props) => {
  const [nomOnglet, setNomOnglet] = useState("");
  const [ajoutChap, setAjoutChap] = useState(false);
  console.log(props);
  return (
    <div key={props.id} className="card border-secondary mb-3">
      <h5 className="card-header">Onglet {props.id}</h5>
      <div className="card-body">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="nomOnglet">Nom d'onglet</label>
            <input
              type="text"
              className="form-control"
              id="nomOnglet"
              placeholder="nom onlget"
              onChange={(e) => {
                setNomOnglet(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {setAjoutChap(true)
            console.log(ajoutChap)}}
          >
            Ajouter Chapitre
          </button>
          <button type="submit" className="btn btn-primary">
            Supprimer onglet
          </button>
        </form>
      </div>
      {ajoutChap ? <CreateChap id={props.id}/> : null}
    </div>
  );
};

export default Onglet;
