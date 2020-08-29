import React, { useState } from "react";

const Onglet = (props) => {
  const [nomOnglet, setNomOnglet] = useState("");
  console.log(props);
  return (
    <div className="card border-secondary mb-3" key={props.id}>
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
              onChange={(e)=>{
                setNomOnglet(e.target.value)}}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={()=>console.log(nomOnglet)}
          >
            Ajouter Chapitre
          </button>
          <button type="submit" className="btn btn-primary">
            Supprimer onglet
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onglet;
