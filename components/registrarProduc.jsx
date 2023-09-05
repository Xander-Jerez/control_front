import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from 'react';

const RegistrarProducto = ()=>{
    const [codigo,setCodigo]= useState("");
    const [nombre,setNombre] = useState("");
    const [cantidad,setCantidad] = useState("");
    const [descripcion,setDescripcion] = useState("");

    const router = useRouter();

    const onSubmit = async (e)=>{

            e.preventDefault();
            const data = {
                "codigo":codigo,
                "nombre":nombre,
                "cantidad":cantidad,
                "descripcion":descripcion
            }
            console.log(data);
            const response =await axios.post(`${process.env.SERVIDOR}/producto`,data);
            console.log(response.data);
            router.push("/producto/produc_index");
    }

    return(
        <form  className="w-75 p-3 border rounded was-validated d-flex justify-content-center m-auto row">

            <div className="col-5">
                <label>Código</label>
                <input onChange={(e)=>{setCodigo(e.target.value)}} value={codigo} className="form-control" placeholder="Código" pattern="^([0-9]+)$" minlength="2" maxlength="10" required/>
                <div className="invalid-feedback">Por favor ingrese números enteros</div>
            </div>

            <div className="col-5">
                <label>Nombre</label>
                <input type="text" onChange={(e)=>{setNombre(e.target.value)}} className="form-control" placeholder="Nombre" minlength="2" maxlength="50" required/>
                <div className="invalid-feedback">Por favor ingrese un Nombre</div>
            </div>

            <div className="col-5"><br />
                <label>Cantidad</label>
                <input  type="number " onChange={(e)=>{setCantidad(e.target.value)}} className="form-control" placeholder="Cantidad" pattern="^([0-9]+)$" maxlength="3" required/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Descripción</label>
                <textarea onChange={(e)=>{setDescripcion(e.target.value)}} className="form-control" placeholder="Descripción" id="" cols="20" rows="5" ></textarea>
            </div>

            <div className="col-10 d-flex justify-content-center mt-4">
                <button onClick ={(e)=>{onSubmit(e)}} type="submit" className="btn btn-primary w-40 ms-4" >Guardar datos</button>
                <button onClick={()=>{router.push("/producto/produc_index")}} className="btn btn-danger w-40 ms-4" >Cancelar</button>
            </div>

        </form>
    )
}
export default RegistrarProducto;