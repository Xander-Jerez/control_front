import React, { Component } from 'react';
import Header from "../../../components/header/header.component";
import RegistrarProducto from "../../../components/registrarProduc";

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
                <h1 className="text-center h2 " style={{fontFamily: 'Albertus'}}>Registro de Producto</h1>
            </div>
            <RegistrarProducto/>
        </div>
    )
}

export default Registrar;