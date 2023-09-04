import axios from "axios";
import { useRouter } from "next/router";
import React,{useEffect, useState, Component} from "react";
import Header from "../../../components/header/header.component";
import EditarEntrega from "../../../components/editarEntrega";

class Pestania extends Component {
    componentDidMount() {
        document.title = 'Modificar';
    }
    render() {
      return
    }
}

const Modificar = ()=>{

    const [producto, setProducto] = useState([]);
    const router = useRouter();
    const id = router.query.entrega;

    useEffect(() => {
        const getProducto = async () => {
        if (id === undefined) return;
        const response = await axios.get(`${process.env.SERVIDOR}/entrega/show/${id}`);
        setProducto(response.data);
        };

        getProducto();
    }, [id]);
  
    return(
        <div className="w-100">
            <Pestania></Pestania>
            <Header/>
            <br/><br/><br/><br/><br/>
            <h1 className="text-center h2 mt-2 mb-2" style={{fontFamily: 'Albertus'}}>Modificar Datos de Entrega</h1>
            { producto && (
                <EditarEntrega producto={producto} />
            )}
        </div>
    )
}

export default Modificar;