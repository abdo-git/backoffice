import React, { Component } from "react";

class addTag extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="nbrOnglet">Nombre d'onglet</label>
            <input
              type="text"
              className="form-control"
              id="nbrOnglet"
              placeholder="nombre d'onglet"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Créer
          </button>
        </form>
      </div>
    );
  }
}

export default addTag;
