import React, { Component } from 'react';
import styles from './Tags.module.css'

class Tags extends Component {

    state={
        userInput:'',
        listTag:[
            {id:1,content:"pointeur"},
            {id:2,content:"tri"},
            {id:3,content:"recursive"}
        ]
    }

    tagList = ()=>{
        return(
            this.state.listTag.length ? 
            this.state.listTag.map(( tag => {
                return(
                    <li className="list-group-item d-flex justify-content-between" key={tag.id}>
                        <span>{tag.content}</span>
                        <button className="btn btn-outline-primary" onClick={()=>{this.deleteTag(tag.id)}} type="button" id={tag.id}>supprimer</button>
                    </li>
                )
            }))
            : <li className="list-group-item d-flex justify-content-between ">il y'a pas de tag</li>
            )
    }

    deleteTag(id){
        
        const listTag = this.state.listTag.filter(tag => {
            return tag.id !== id
          });
          this.setState({
            listTag
          });
    }
    handleChange = (e)=>{
        this.setState({
            userInput:e.target.value
        })
        }
    addTag = ()=>{
        if(this.state.userInput.length){
            let listTag = [...this.state.listTag,{id:Math.random(),content:this.state.userInput}]
            this.setState({
                listTag,
                userInput:''
            })
        }
    }
    
    render(){
        return(
        <div className="container pt-5">
            <div className="widget-header text-center">
                <h3 >Liste des tags</h3>
            </div>
            <div className="widget-content">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <ul className="list-group ">{this.tagList()}</ul>
                        <div className="input-group pt-2">
                            <input onChange={this.handleChange} value={this.state.userInput} className="form-control" type="text"placeholder="Add TAG"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="button" onClick={this.addTag}>Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

export default Tags;