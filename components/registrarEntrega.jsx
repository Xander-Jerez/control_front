import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const RegistrarEntrega = ()=>{
    const [tipo,setTipo]= useState("");
    const [marca,setMarca] = useState("");
    const [modelo,setModelo] = useState("");
    const [n_serie,setN_serie]= useState("");
    const [cod_servicio,setCod_servicio] = useState("");
    const [imei,setImei]= useState("");
    const [pin,setPin] = useState("");
    const [puk,setPuk] = useState("");
    const [fecha_compra,setFecha_compra]= useState("");
    const [descripcion,setDescripcion] = useState("");
    const [procesador,setProcesador] = useState("");
    const [ram,setRam]= useState("");
    const [tipo_almacenamiento,setTipo_almacenamiento] = useState("");
    const [capacidad,setCapacidad] = useState("");
    const [observacion,setObservacion]= useState("");
    const [otorga,setOtorga] = useState("");
    const [recibe,setRecibe]= useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [listadoProductos, setListadoProductos] = useState([]); 
    const router = useRouter();

    const onSubmit = async (e)=>{
            e.preventDefault();

             // Validación manual de campos requeridos
            if (!tipo || !marca || !modelo || !n_serie || !cod_servicio || fecha_compra === "" || !otorga || !recibe) {
                alert("Todos los campos requeridos deben estar completados.");
                return;
            }
            
            const fecha_nueva = new Date(fecha_compra);
            console.log(fecha_nueva);
            const data = {
                "tipo":tipo,
                "marca":marca,
                "modelo":modelo,
                "n_serie":n_serie,
                "cod_servicio":cod_servicio,
                "imei":imei,
                "pin":pin,
                "puk":puk,
                "fecha_compra":fecha_compra,
                "descripcion":descripcion,
                "procesador":procesador,
                "ram":ram,
                "tipo_almacenamiento":tipo_almacenamiento,
                "capacidad":capacidad,
                "observacion":observacion,
                "otorga":otorga,
                "recibe":recibe
            }
            console.log(data);
            await axios.post(`${process.env.SERVIDOR}/entrega`,data);
            router.push("/entrega/entrega_index");
    }

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
                    isSearchable={true} // Activar la búsqueda
                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }) }} // Aumentar el z-index del menú
                />
            </div>

            <div className="col-5"><br />
                <label>Marca</label>
                <input onChange={(e)=>{setMarca(e.target.value)}} className="form-control" placeholder="Marca del dispositivo" id="" cols="20" rows="5" required></input>
            </div>

            <div className="col-5"><br />
                <label>Modelo</label>
                <input onChange={(e)=>{setModelo(e.target.value)}} className="form-control" placeholder="Modelo" id="" cols="20" rows="5" required></input>
            </div>

            <div className="col-5"><br />
                <label>Número de serie</label>
                <input  type="number " onChange={(e)=>{setN_serie(e.target.value)}} className="form-control" placeholder="Ingrese Número de Serie" pattern="^([0-9]+)$" maxlength="3"/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Código de servicio</label>
                <input onChange={(e)=>{setCod_servicio(e.target.value)}} className="form-control" placeholder="Código de Servicio" id="" cols="20" rows="5" ></input>
            </div>

            <div className="col-5"><br />
                <label>Imei</label>
                <input  type="number " onChange={(e)=>{setImei(e.target.value)}} className="form-control" placeholder="Imei" pattern="^([0-9]+)$" maxlength="10"/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Pin</label>
                <input  type="number " onChange={(e)=>{setPin(e.target.value)}} className="form-control" placeholder="Pin" pattern="^([0-9]+)$" maxlength="10"/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Puk</label>
                <input  type="number " onChange={(e)=>{setPuk(e.target.value)}} className="form-control" placeholder="Puk" pattern="^([0-9]+)$" maxlength="10"/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Fecha de compra</label>
                <input required type="date" className="form-control" onChange={(e)=>setFecha_compra(e.target.value)} placeholder=""/>
                <div className="invalid-feedback">Por favor llene el campo</div>
            </div>

            <div className="col-5"><br />
                <label>Procesador</label>
                <input onChange={(e)=>{setProcesador(e.target.value)}} className="form-control" placeholder="Procesador" id="" cols="20" rows="5" ></input>
            </div>

            <div className="col-5"><br />
                <label>RAM</label>
                <input  type="number " onChange={(e)=>{setRam(e.target.value)}} className="form-control" placeholder="Memoria Ram" pattern="^([0-9]+)$" maxlength="3"/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Tipo de almacenamiento</label>
                <input onChange={(e)=>{setTipo_almacenamiento(e.target.value)}} className="form-control" placeholder="tipo de almacenamiento" id="" cols="20" rows="5" ></input>
            </div>

            <div className="col-5"><br />
                <label>Capacidad</label>
                <input  type="number " onChange={(e)=>{setCapacidad(e.target.value)}} className="form-control" placeholder="Capacidad" pattern="^([0-9]+)$" maxlength="3"/>
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Observación</label>
                <textarea onChange={(e)=>{setObservacion(e.target.value)}} className="form-control" placeholder="Observación" id="" cols="20" rows="1" ></textarea>
            </div>

            <div className="col-5"><br />
                <label>Descripción</label>
                <textarea onChange={(e)=>{setDescripcion(e.target.value)}} className="form-control" placeholder="Descripción" id="" cols="20" rows="1" ></textarea>
            </div>

            <div className="col-5"><br />
                <label>Entrega</label>
                <input type="text" onChange={(e)=>{setOtorga(e.target.value)}} className="form-control" placeholder="Nombre de quien entrega" minlength="2" maxlength="50" required/>
                <div className="invalid-feedback">Por favor ingrese un Nombre</div>
            </div>

            <div className="col-5"><br />
                <label>Recibe</label>
                <input type="text" onChange={(e)=>{setRecibe(e.target.value)}} className="form-control" placeholder="Nombre de quien recibe" minlength="2" maxlength="50" required/>
                <div className="invalid-feedback">Por favor ingrese un Nombre</div>
            </div>

            <div className="col-10 d-flex justify-content-center mt-4">
                <button onClick ={(e)=>{onSubmit(e)}} type="submit" className="btn btn-primary w-40 ms-4" >Guardar datos</button>
                <button onClick={()=>{router.push("/entrega/entrega_index")}} className="btn btn-danger w-40 ms-4" >Cancelar</button>
            </div>

        </form>
    )
}
export default RegistrarEntrega;