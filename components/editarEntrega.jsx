import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const EditarEntrega = ({ producto })=>{
    const router = useRouter();

  // Función para formatear la fecha
  const formatoFecha = (fechaISO) => {
    if (!fechaISO) return "";
    
    // Si tu fecha está en UTC, puedes convertirla a una fecha local así
    const fechaLocal = new Date(fechaISO);
    fechaLocal.setMinutes(fechaLocal.getMinutes() + fechaLocal.getTimezoneOffset());
    
    const year = fechaLocal.getFullYear();
    let month = fechaLocal.getMonth() + 1; // Los meses van de 0 a 11, así que sumamos 1
    let day = fechaLocal.getDate();
    
    // Asegurarse de que el día y el mes sean de dos dígitos
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    return `${year}-${month}-${day}`;
  };
  

  // Preparar el producto con la fecha formateada
  const productoConFechaFormat = {
    ...producto,
    fecha_compra: formatoFecha(producto.fecha_compra)
  };

  // Inicializar estados
  const [formData, setFormData] = useState(productoConFechaFormat || {});
  const [listadoProductos, setListadoProductos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
    
  
    useEffect(() => {
        const obtenerProductos = async () => {
          const response = await axios.get(`${process.env.SERVIDOR}/productos`);
          setListadoProductos(response.data);
        };
      
        obtenerProductos();
      }, []);
      
      
      useEffect(() => {
        console.log('El valor actual de producto es:', producto);
        console.log('El valor actual de formData es:', formData);
    
        const productoConFechaFormat = {
            ...producto,
            fecha_compra: formatoFecha(producto.fecha_compra)
        };
    
        if (JSON.stringify(formData) !== JSON.stringify(productoConFechaFormat)) {
            setFormData(productoConFechaFormat || {});
        }
    }, [producto]);
    
      
      useEffect(() => {
        if (formData && formData.tipo) {
          setSelectedOption({ value: formData.tipo, label: formData.tipo });
        }
      }, [formData]);
      
  
    // Manejo de cambio en el Select
    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
      setFormData({ ...formData, tipo: selectedOption.value });
    };

    
    // Envío de formulario
    const onSubmitEditar = async (e) => {
      e.preventDefault();
      const response = await axios.put(`${process.env.SERVIDOR}/entrega/update/${producto._id}`, formData);
      router.push("/entrega/entrega_index");
    };
  
    // Verificación de producto cargado
    if (!formData || Object.keys(formData).length === 0) {
      return <div>Cargando...</div>;
    }
  
    const selectOptions = listadoProductos.map((producto) => ({
      value: producto.nombre,
      label: producto.nombre,
    }));

    return(
        <form  className="w-75 p-3 border rounded was-validated d-flex justify-content-center m-auto row" onSubmit={onSubmitEditar}>
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
                <input
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    className="form-control"
                    placeholder="Marca"
                    id=""
                    cols="20"
                    rows="5"
                    required
                    value={formData.marca || ""}
                />

            </div>

            <div className="col-5"><br />
                <label>Modelo</label>
                <input
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    className="form-control"
                    placeholder="Modelo"
                    id=""
                    cols="20"
                    rows="5"
                    required
                    value={formData.modelo || ""}
                />
            </div>

            <div className="col-5"><br />
                <label>Número de serie</label>
                <input
                    type="number"
                    onChange={(e) => setFormData({ ...formData, n_serie: e.target.value })}
                    className="form-control"
                    placeholder="Ingrese Número de Serie"
                    pattern="^([0-9]+)$"
                    maxLength="10"
                    required
                    value={formData.n_serie || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Código de servicio</label>
                <input
                    onChange={(e) => setFormData({ ...formData, cod_servicio: e.target.value })}
                    className="form-control"
                    placeholder="Código de Servicio"
                    id=""
                    cols="20"
                    rows="5"
                    value={formData.cod_servicio || ""}
                />
            </div>

            <div className="col-5"><br />
                <label>Imei</label>
                <input
                    type="number"
                    onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
                    className="form-control"
                    placeholder="Imei"
                    pattern="^([0-9]+)$"
                    maxLength="10"
                    required
                    value={formData.imei || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Pin</label>
                <input
                    type="number"
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                    className="form-control"
                    placeholder="Pin"
                    pattern="^([0-9]+)$"
                    maxLength="10"
                    required
                    value={formData.pin || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Puk</label>
                <input 
                    type="number"
                    onChange={(e) => setFormData({ ...formData, puk: e.target.value })}
                    className="form-control"
                    placeholder="Puk"
                    pattern="^([0-9]+)$"
                    maxLength="10"
                    required
                    value={formData.puk || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Fecha de compra</label>
                <input 
                    type="date"
                    onChange={(e) => setFormData({ ...formData, fecha_compra: e.target.value })}
                    className="form-control"
                    placeholder=""
                    required
                    value={formData.fecha_compra || ""}
                />

                <div className="invalid-feedback">Por favor llene el campo</div>
            </div>

            <div className="col-5"><br />
                <label>Procesador</label>
                <input
                    type="text"
                    onChange={(e) => setFormData({ ...formData, procesador: e.target.value })}
                    className="form-control"
                    placeholder="Procesador"
                    minLength="2"
                    maxLength="50"
                    required
                    value={formData.procesador || ""}
                />
            </div>

            <div className="col-5"><br />
                <label>RAM</label>
                <input 
                    type="number"
                    onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                    className="form-control"
                    placeholder="Memoria Ram"
                    pattern="^([0-9]+)$"
                    maxLength="3"
                    required
                    value={formData.ram || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Tipo de almacenamiento</label>
                <input 
                    type="text"
                    onChange={(e) => setFormData({ ...formData, tipo_almacenamiento: e.target.value })}
                    className="form-control"
                    placeholder="tipo de almacenamiento"
                    minLength="2"
                    maxLength="50"
                    required
                    value={formData.tipo_almacenamiento || ""}
                />
            </div>

            <div className="col-5"><br />
                <label>Capacidad</label>
                <input 
                    type="number"
                    onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                    className="form-control"
                    placeholder="Capacidad"
                    pattern="^([0-9]+)$"
                    maxLength="3"
                    required
                    value={formData.capacidad || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un número entero</div>
            </div>

            <div className="col-5"><br />
                <label>Observación</label>
                <textarea
                    onChange={(e) => setFormData({ ...formData, observacion: e.target.value })}
                    className="form-control"
                    placeholder="Observación"
                    id=""
                    cols="20"
                    rows="1"
                    value={formData.observacion || ""}
                ></textarea>
            </div>

            <div className="col-5"><br />
                <label>Descripción</label>
                <textarea
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="form-control"
                    placeholder="Descripción"
                    id=""
                    cols="20"
                    rows="1"
                    value={formData.descripcion || ""}
                ></textarea>

            </div>

            <div className="col-5"><br />
                <label>Entrega</label>
                <input 
                    type="text"
                    onChange={(e) => setFormData({ ...formData, otorga: e.target.value })}
                    className="form-control"
                    placeholder="Nombre de quien entrega"
                    minLength="2"
                    maxLength="50"
                    required
                    value={formData.otorga || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un Nombre</div>
            </div>

            <div className="col-5"><br />
                <label>Recibe</label>
                <input 
                    type="text"
                    onChange={(e) => setFormData({ ...formData, recibe: e.target.value })}
                    className="form-control"
                    placeholder="Nombre de quien recibe"
                    minLength="2"
                    maxLength="50"
                    required
                    value={formData.recibe || ""}
                />
                <div className="invalid-feedback">Por favor ingrese un Nombre</div>
            </div>


            <div className="col-10 d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary w-40 ms-4" >Guardar datos</button>
                <button onClick={()=>{router.push("/entrega/entrega_index")}} className="btn btn-danger w-40 ms-4" >Cancelar</button>
            </div>
        </form>
    )
}
export default EditarEntrega;