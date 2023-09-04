import Header from "../../components/header/header.component"
import React, { Component } from 'react';
import ShowEntregas from "../../components/showEntregas";

const Entregas = ()=>{
    class Pestaña extends Component {
        componentDidMount() {
          document.title = 'Entregas';
        }
        render() {
          return
        }
    }

    return (
        <div className="w-100 d-flex flex-column">
            <Pestaña></Pestaña>
            <Header/>
            <br/><br/><br/><br/><br/>
            <ShowEntregas/>
        </div>
    )
};

export default Entregas;