import Header from "../../components/header/header.component"
import ShowProductos from "../../components/showProductos";
import React, { Component } from 'react';

const Productos = ()=>{
    class Pestaña extends Component {
        componentDidMount() {
          document.title = 'Inventario';
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
            <ShowProductos/>
        </div>
    )
};

export default Productos;