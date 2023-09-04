import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const EditarEntrega = ({ producto })=>{
    if (producto === undefined || producto.length === 0) {
        return;
    }
    const [tipo,setTipo]= useState(producto.tipo || "");
    const [marca,setMarca] = useState(producto.marca || "");
    const [modelo,setModelo] = useState(producto.modelo || "");
    const [n_serie,setN_serie]= useState(producto.n_serie || "");
    const [cod_servicio,setCod_servicio] = useState(producto.cod_servicio || "");
    const [imei,setImei]= useState(producto.imei || "");
    const [pin,setPin] = useState(producto.pin || "");
    const [puk,setPuk] = useState(producto.puk || "");
    const [fecha_compra,setFecha_compra]= useState(producto.fecha_compra || "");
    const [descripcion,setDescripcion] = useState(producto.descripcion || "");
    const [procesador,setProcesador] = useState(producto.procesador || "");
    const [ram,setRam]= useState(producto.ram || "");
    const [tipo_almacenamiento,setTipo_almacenamiento] = useState(producto.tipo_almacenamiento || "");
    const [capacidad,setCapacidad] = useState(producto.capacidad || "");
    const [observacion,setObservacion]= useState(producto.observacion || "");
    const [otorga,setOtorga] = useState(producto.otorga || "");
    const [recibe,setRecibe]= useState(producto.recibe || "");
    const [selectedOption, setSelectedOption] = useState(null);
    const [listadoProductos, setListadoProductos] = useState([]); 
    const router = useRouter();

    const onSubmitEditar = async (e)=>{
        e.preventDefault();
        const productoEditado = {
            tipo,
            marca,
            modelo,
            n_serie,
            cod_servicio,
            imei,
            pin,
            puk,
            fecha_compra,
            descripcion,
            procesador,
            ram,
            tipo_almacenamiento,
            capacidad,
            observacion,
            otorga,
            recibe
        };
        const response = await axios.put(`${process.env.SERVIDOR}/entrega/update/${producto._id}`, productoEditado);
        console.log(response);
        router.push("/entrega/entrega_index");
    };

    useEffect(()=>{
        const obtenerProductos = async ()=>{
            const response = await axios.get(`${process.env.SERVIDOR}/productos`);
            setListadoProductos(response.data);
        };
        obtenerProductos();
    },[]);

    // Convertir tus productos en un formato que react-select pueda entender
    const selectOptions = listadoProductos.map(producto => {
        return { value: producto.nombre, label: producto.nombre }
    });

    // Manejar cambios en el selector
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setTipo(selectedOption.value);  // Actualizando el estado "tipo"
        console.log(`Option selected:`, selectedOption);
    };  

    return(
        <form  className="w-75 p-3 border rounded was-validated d-flex justify-content-center m-auto row">
            <div className="col-5"><br />
                <label>Tipo</label>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={selectOptions}
                />
            </div>
            <div className="col-5"><br />
                <label>Marca</label>
                <input onChange={(e)=>{setMarca(e.target.value)}} className="form-control" placeholder="Marca del dispositivo" id="" cols="20" rows="5" required value={producto.marca}></input>
            </div>

            <div className="col-5"><br />
                <label>Modelo</label>
                <input onChange={(e)=>{setModelo(e.target.value)}} className="form-control" placeholder="Modelo" id="" cols="20" rows="5" required value={producto.modelo}></input>
            </div>

            <div className="col-5"><br />
                <label>Número de serie</label>
                <input  type="number " onChange={(e)=>{setN_serie(e.target.value)}} className="form-control" placeholder="Ingrese Número de Serie" pattern="^([0-9]+)$" maxlength="3" value={producto.n_serie}/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Código de servicio</label>
                <input onChange={(e)=>{setCod_servicio(e.target.value)}} className="form-control" placeholder="Código de Servicio" id="" cols="20" rows="5" value={producto.cod_servicio}></input>
            </div>

            <div className="col-5"><br />
                <label>Imei</label>
                <input  type="number " onChange={(e)=>{setImei(e.target.value)}} className="form-control" placeholder="Imei" pattern="^([0-9]+)$" maxlength="10" value={producto.imei}/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Pin</label>
                <input  type="number " onChange={(e)=>{setPin(e.target.value)}} className="form-control" placeholder="Pin" pattern="^([0-9]+)$" maxlength="10" value={producto.pin}/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Puk</label>
                <input  type="number " onChange={(e)=>{setPuk(e.target.value)}} className="form-control" placeholder="Puk" pattern="^([0-9]+)$" maxlength="10" value={producto.puk}/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Fecha de compra</label>
                <input required type="date" className="form-control" onChange={(e)=>setFecha_compra(e.target.value)} placeholder="" value={producto.fecha_compra}/>
                <div className="invalid-feedback">Por favor llene el campo</div>
            </div>

            <div className="col-5"><br />
                <label>Procesador</label>
                <input onChange={(e)=>{setProcesador(e.target.value)}} className="form-control" placeholder="Procesador" id="" cols="20" rows="5" value={producto.procesador}></input>
            </div>

            <div className="col-5"><br />
                <label>RAM</label>
                <input  type="number " onChange={(e)=>{setRam(e.target.value)}} className="form-control" placeholder="Memoria Ram" pattern="^([0-9]+)$" maxlength="3" value={producto.ram}/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Tipo de almacenamiento</label>
                <input onChange={(e)=>{setTipo_almacenamiento(e.target.value)}} className="form-control" placeholder="tipo de almacenamiento" id="" cols="20" rows="5" value={producto.tipo_almacenamiento}></input>
            </div>

            <div className="col-5"><br />
                <label>Capacidad</label>
                <input  type="number " onChange={(e)=>{setCapacidad(e.target.value)}} className="form-control" placeholder="Capacidad" pattern="^([0-9]+)$" maxlength="3" value={producto.capacidad}/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Observación</label>
                <textarea onChange={(e)=>{setObservacion(e.target.value)}} className="form-control" placeholder="Observación" id="" cols="20" rows="1" value={producto.observacion}></textarea>
            </div>

            <div className="col-5"><br />
                <label>Descripción</label>
                <textarea onChange={(e)=>{setDescripcion(e.target.value)}} className="form-control" placeholder="Descripción" id="" cols="20" rows="1" value={producto.descripcion}></textarea>
            </div>

            <div className="col-5"><br />
                <label>Entrega</label>
                <input type="text" onChange={(e)=>{setOtorga(e.target.value)}} className="form-control" placeholder="Nombre de quien entrega" minlength="2" maxlength="50" required value={producto.otorga}/>
                <div className="invalid-feedback">Por favor ingrese un Nombre</div>
            </div>

            <div className="col-5"><br />
                <label>Recibe</label>
                <input type="text" onChange={(e)=>{setRecibe(e.target.value)}} className="form-control" placeholder="Nombre de quien recibe" minlength="2" maxlength="50" required value={producto.recibe}/>
                <div className="invalid-feedback">Por favor ingrese un Nombre</div>
            </div>

            <div className="col-10 d-flex justify-content-center mt-4">
                <button onClick ={(e)=>{onSubmitEditar(e)}} type="submit" className="btn btn-primary w-40 ms-4" >Guardar datos</button>
                <button onClick={()=>{router.push("/entrega/entrega_index")}} className="btn btn-danger w-40 ms-4" >Cancelar</button>
            </div>
        </form>
    )
}
export default EditarEntrega;