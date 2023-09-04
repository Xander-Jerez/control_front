import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import Swal from 'sweetalert2';

const ShowEntregas = ()=>{
    
    const router = useRouter();
    const [entregas, setEntregas] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [showDetails,setShowDetails] = useState(false);
    const [idShowDetails,setIdShowDetails] = useState("");

    const getEntregas = async ()=>{
            const response = await axios.get(`${process.env.SERVIDOR}/entregas`);
            setEntregas(response.data);
            setIsLoading(true);
            console.log(response.data);
    }
        useEffect(()=>{
        getEntregas()

    },[]);

    const deleteEntrega= async (id)=>{
        Swal.fire({
            title: '¿Estás seguro?',
            text: "La entrega se ELIMINARÁ de forma permanente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:'Sí, eliminar!',
            cancelButtonText:'No, cancelar'
        }).then(async (result)=>{
            if(result.isConfirmed){
                await axios.delete(`${process.env.SERVIDOR}/entrega/delete/${id}`);
                getEntregas();
                Swal.fire(
                    'Eliminado!',
                    'La entrega ha sido eliminada.',
                    'success'
                );
            }else{
                Swal.fire(
                    'Cancelado',
                    'La entrega no ha sido eliminada.',
                    'error'
                );
            }
        });
    }

    const showDetailsEntrega = (id)=>{
        setShowDetails(!showDetails);
        setIdShowDetails(id);
        console.log(id);
    }

    if(isLoading){
        return (
            <div className="w-75 m-auto">
                <div className="w-75 d-flex justify-content-center align-items-center">
                    <h1 className="text-center mt-3 h2">Listado de Entregas registradas</h1>
                    <button className="btn btn-primary ms-3 mt-2 text-capitalize" onClick={()=>{router.push("registrar/reg_entrega")}} >registrar entrega</button>
                </div>
                <div className="table-responsive">
                    { !showDetails && (
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>tipo</th>
                                    <th>marca</th>
                                    <th>modelo</th>
                                    <th>recibe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    entregas && entregas.map((entrega,idx)=>{
                                        return(
                                            <tr key={idx}>
                                                <td>{entrega.tipo}</td>
                                                <td>{entrega.marca}</td>
                                                <td>{entrega.modelo}</td>
                                                <td>{entrega.recibe}</td>
                                                <td className="">
                                                    <button className="btn btn-success" onClick={()=>{router.push(`modificar/${entrega._id}`)}} >Modificar</button>
                                                    <button onClick={()=>{deleteEntrega(entrega._id)}} className="btn btn-danger ms-2">Eliminar</button>
                                                    <button onClick={()=>{showDetailsEntrega(entrega._id)}} className="btn btn-primary ms-2">Ver detalles</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                    <div>
                        {
                            entregas && showDetails && entregas.filter((entrega)=>entrega._id===idShowDetails).map((entrega,idx)=>{
                                return(
                                    <div key={idx}>
                                        <div>
                                            <div className="d-flex justify-content-between mt-4">
                                                <h3 className="fw-bold">Detalles de la entrega</h3>
                                                <button onClick={()=>{showDetailsEntrega(entrega._id)}} className="btn btn-primary ms-2">Ocultar detalles</button>
                                            </div>
                                            <div className="d-flex gap-xl-5 mt-1">
                                                <div>
                                                    <p><span className="fw-semibold text-capitalize">tipo:</span> {entrega.tipo}</p>
                                                    <p><span className="fw-semibold text-capitalize">marca:</span> {entrega.marca}</p>
                                                    <p><span className="fw-semibold text-capitalize">modelo:</span> {entrega.modelo}</p>
                                                    <p><span className="fw-semibold text-capitalize">Nº serie:</span> {entrega.n_serie}</p>
                                                    <p><span className="fw-semibold text-capitalize">Codigo de servicio:</span> {entrega.cod_servicio}</p>
                                                    <p><span className="fw-semibold text-capitalize">imei:</span> {entrega.imei}</p>
                                                    <p><span className="fw-semibold text-capitalize">pin:</span> {entrega.pin}</p>
                                                    <p><span className="fw-semibold text-capitalize">puk:</span> {entrega.puk}</p>
                                                </div>
                                                <div>
                                                    <p><span className="fw-semibold text-capitalize">fecha de compra:</span> {moment(entrega.fecha_compra).format("DD/MM/YYYY")}</p>
                                                    <p><span className="fw-semibold text-capitalize">descripcion:</span> {entrega.descripcion}</p>
                                                    <p><span className="fw-semibold text-capitalize">procesador:</span> {entrega.procesador}</p>
                                                    <p><span className="fw-semibold text-capitalize">ram:</span> {entrega.ram}</p>
                                                    <p><span className="fw-semibold text-capitalize">tipo de almacenamiento:</span> {entrega.tipo_almacenamiento}</p>
                                                    <p><span className="fw-semibold text-capitalize">capacidad:</span> {entrega.capacidad}</p>
                                                    <p><span className="fw-semibold text-capitalize">observacion:</span> {entrega.observacion}</p>
                                                    <p><span className="fw-semibold text-capitalize">otorga:</span> {entrega.otorga}</p>
                                                    <p><span className="fw-semibold text-capitalize">recibe:</span> {entrega.recibe}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    return <div>Sin resultados de Entregas</div>

}

export default ShowEntregas;