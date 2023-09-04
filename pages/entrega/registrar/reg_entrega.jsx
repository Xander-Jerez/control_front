import React, { Component } from 'react';
import Header from "../../../components/header/header.component";
import RegistrarEntrega from "../../../components/registrarEntrega";

const Registrar = ()=>{
    class Pestaña extends Component {
        componentDidMount() {
          document.title = 'Registro';
        }
        render() {
          return
        }
    }

    return(

        <div className="w-100 d-flex flex-column">
            <Pestaña></Pestaña>
            <Header/>
            <br/><br/><br/><br/><br/>
            <div className="col-12">
                <h1 className="text-center h2 " style={{fontFamily: 'Albertus'}}>Registro de Entrega</h1>
            </div>
            <RegistrarEntrega/>
        </div>
    )
}

export default Registrar;