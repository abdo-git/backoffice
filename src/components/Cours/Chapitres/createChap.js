import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Modal} from "react-bootstrap";
import {connect} from 'react-redux'
import {CreateChap} from '../../../store/actions/chapAction'

class createChap extends Component {
  state = {
    titre: "",
    contenu: "",
    volumeHoraire: "",
    niveau: "",
    idOnget: this.props.id,
  };

  option() {
    let options = [];
    for (let i = 0; i < 5; i++) {
      options.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    return options;
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    console.log(this.state)
    this.props.CreateChap(this.state)
  }
  render() {
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Créer votre chapitre ici</Modal.Title>
        </Modal.Header>

         <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="titre">Titre du chapitre:</label>
              <input
                type="text"
                className="form-control"
                id="titre"
                placeholder="titre du chapitre"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="volumeHoraire">Volume horaire:</label>
              <input
                type="number"
                className="form-control"
                id="volumeHoraire"
                placeholder="volume horaire"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="niveau">Niveau</label>
              <select className="form-control" id="niveau" placeholder="niveau" onClick={this.handleChange}>
                {this.option()}
              </select>
            </div>
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({
                  ...this.state,
                  contenu: data
                });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
            Créer
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    CreateChap: (chap) => dispatch(CreateChap(chap))
  }
}
export default connect(null, mapDispatchToProps)(createChap);
