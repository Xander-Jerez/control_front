
import { useRouter } from 'next/router';
import React, { useState } from "react";
import Image from 'next/image'

const Header = ()=>{

    const router = useRouter()

    return(
        <div className="w-100 header" style={{position: 'fixed', zIndex:999 }}>

            <a href="/producto/..">
                <div style={{ position: 'absolute', top: 40, left: 15, border: 'red', }}>
                    <Image src="https://www.puertocoronel.cl/img/sitio/logo.png" alt="Random Image" width={150} height={50} />
                </div>
            </a>

            <div style={{fontFamily: 'Arial'}}>
                <button className="btn btn-secundary ms-3 mt-2" onClick={()=>{router.push("/producto/..")}} >INICIO</button>
                <button className="btn btn-secundary ms-3 mt-2" onClick={()=>{router.push("/producto/produc_index")}} > PRODUCTOS </button>
            </div>
        </div>
    )
}

export default Header;