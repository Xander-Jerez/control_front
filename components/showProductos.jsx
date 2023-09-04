import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

const ShowProductos = ()=>{
    const router = useRouter();
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const getProductos = async () => {
        const response = await axios.get(`${process.env.SERVIDOR}/productos`);
        setProductos(response.data);
        setProductosFiltrados(response.data); // También inicializa productosFiltrados
        setIsLoading(true);
    }

    useEffect(() => {
        getProductos()
    }, []);

    const deleteProducto = async (id) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "El producto se ELIMINARÁ de forma permanente!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'No, cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(`${process.env.SERVIDOR}/producto/delete/${id}`);
            getProductos(); // Actualizar la lista de productos
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
          } else {
            Swal.fire(
              'Cancelado',
              'El producto no ha sido eliminado.',
              'error'
            );
          }
        });
      }      
    
    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = productos.filter((producto) => {
            if (producto.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                producto.codigo.includes(terminoBusqueda.toLowerCase())) {
                return producto;
            }
        });
        setProductosFiltrados(resultadosBusqueda);
    }

    const handleChange = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    if(isLoading){
        return (
            <div className="w-100 m-auto" >
                <h1 className="text-center mt-3 h2" style={{fontFamily: 'Albertus'}}>LISTADO DE PRODUCTOS</h1>
                <div className="w-75 d-flex align-items-center">
                    <button className="btn btn-primary ms-3 mt-2 " onClick={()=>{router.push("registrar/reg_product/")}} >Registrar Producto</button>
                    <div className="containerInput">
                        <input className="form-control inputBuscar ms-3 mt-2" value={busqueda} placeholder="Ingrese su búsqueda"
                        onChange={handleChange} pattern="[A-Za-z0-9]+" minlength="0" maxlength="20" />
                        <filtrar></filtrar>
                    </div>
                </div><br /><br />
                <table className="table table-hover table-bordered" /* <table className="table table-hover"> */>
                    <thead>
                        <tr className="text-center" >
                            <th>Lista</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productosFiltrados.map((producto,idx)=>{
                                document.body.style.background ='#FFFFFF';
                                if (producto.cantidad==0 ) {
                                    return(
                                        <tr className="text-center" key={idx}>
                                            <td>{"❌"}</td>
                                            <td>{producto.codigo}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>
                                                <button className="btn btn-success" onClick={()=>{router.push(`producto/modificar/[producto]${producto._id}`)}} >Modificar</button>
                                                <button className="btn btn-danger ms-4 mt-2 h1" onClick={()=>{deleteProducto(producto._id)}} >Eliminar</button>
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    if(producto.cantidad<5){
                                        return(
                                            <tr className="text-center" key={idx}>
                                                <td>{"⚠️"}</td>
                                                <td>{producto.codigo}</td>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>{producto.descripcion}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={()=>{router.push(`modificar/[producto]${producto._id}`)}} >Modificar</button>
                                                    <button className="btn btn-danger ms-4 mt-2 h1" onClick={()=>{deleteProducto(producto._id)}} >Eliminar</button>
                                                </td>
                                            </tr>
                                        )
                                    } else {
                                        return(
                                            <tr className="text-center" key={idx}>
                                                <td>{idx+1}</td>
                                                <td>{producto.codigo}</td>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>{producto.descripcion}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={()=>{router.push(`modificar/${producto._id}`)}} >Modificar</button>
                                                    <button className="btn btn-danger ms-4 mt-2 h1" onClick={()=>{deleteProducto(producto._id)}} >Eliminar</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className='text-center'>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    )
}

export default ShowProductos;