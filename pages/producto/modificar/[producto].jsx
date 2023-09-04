import axios from "axios";
import { useRouter } from "next/router";
import React,{useEffect, useState, Component} from "react";
import Header from "../../../components/header/header.component"

const Modificar = ()=>{
    class Pestaña extends Component {
        componentDidMount() {
            document.title = 'Modificar';
        }
        render() {
          return
        }
    }

    const router = useRouter();
    const id = router.query.producto;
    const [producto,setProducto] = useState({
        'codigo': '',
        'nombre': '',
        'cantidad':'',
        'descripcion':''
    });
    const [codigo,setCodigo]= useState("");
    const [nombre,setNombre] = useState("");
    const [cantidad,setCantidad] = useState("");
    const [descripcion,setDescripcion] = useState("");

    const getProducto = async()=>{
        const response = await axios.get(`${process.env.SERVIDOR}/producto/show/${id}`);
        console.log(response.data);
        setProducto(response.data);
    };

    const onSubmit = async (e)=>{
        e.preventDefault();

        const data = {
            "codigo":producto.codigo,
            "nombre":producto.nombre,
            "cantidad":producto.cantidad,
            "descripcion":producto.descripcion
        }

        console.log(data);
        const response =await axios.put(`${process.env.SERVIDOR}/producto/update/${id}`,data);
        console.log(response.data);
        router.push("/producto/produc_index");
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
    };

    useEffect(()=>{
        getProducto();
    },[])

    return(
        <div className="w-100">
            <Pestaña></Pestaña>
            <Header/>
            <br/><br/><br/><br/><br/>
            <h1 className="text-center h2 mt-2 mb-2" style={{fontFamily: 'Albertus'}}>Modificar Datos de Productos</h1>

            <form  className="w-75 p-3 border rounded d-flex justify-content-center m-auto row">

                <div className="col-5">
                    <label >Código</label>
                    <input type="number" value={producto.codigo} name="codigo" onChange={(e)=>{setCodigo(e.target.value)}} className="form-control" placeholder="Código" />
                    <div className="invalid-feedback">Por favor llene el campo</div>
                </div>

                <div className="col-5">
                    <label>Nombre</label>
                    <input type="text" value={producto.nombre} name="nombre" onChange={handleInputChange} className="form-control" placeholder="Nombre" />
                    <div className="invalid-feedback">Por favor llene el campo</div>
                </div>

                <div className="col-5"> <br />
                    <label>Cantidad</label>
                    <input type="number" value={producto.cantidad} name="cantidad" onChange={handleInputChange} className="form-control" placeholder="Cantidad" />
                    <div className="invalid-feedback">Por favor llene el campo</div>
                </div>

                <div className="col-5"> <br />
                    <label>Descripción</label>
                    <textarea value={producto.descripcion} name="descripcion" onChange={handleInputChange} className="form-control" placeholder="Descripción" id="" cols="20" rows="5"></textarea>
                </div>

                <div className="col-10 d-flex justify-content-center mt-4">
                    <button onClick={(e)=>onSubmit(e)} className="btn btn-primary w-40 ms-4" type="submit">Guardar datos</button>
                    <button onClick={()=>{router.push("/producto/produc_index")}} className="btn btn-danger ms-4" >Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Modificar;