import { Button, Container, Heading, HStack, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState, Component } from 'react';
import Image from 'next/image';

function MostrarImagen() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function actualizarTamanoVentana() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', actualizarTamanoVentana);

    actualizarTamanoVentana();

    return () => window.removeEventListener('resize', actualizarTamanoVentana);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Image
        src="https://blog.portalvmi.com.br/wp-content/uploads/2022/02/20-A-importancia-da-Tecnologis-da-Informacao-1110x508.jpeg"
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
        alt="Imagen de fondo"
      />
    </div>
  );
}


const Index = () => {
  useEffect(() => {
    document.title = 'Dpto. TI';
  }, []);

  const router = useRouter();

  return (
    <div>
      <Container maxW="container.x1">
        <HStack marginTop={"40px"}>
          <a href="/producto/..">
            <div>
              <Image src="https://www.puertocoronel.cl/img/sitio/logo.png"
              alt="Logo de Puerto Coronel"
              position="absolute"
              width={200} // Ajusta este valor seg      n el tama      o deseado
              height={100} // Ajusta este valor seg      n el tama      o deseado
              layout="responsive" // Esto permite que la imagen sea responsive
              />
            </div>
          </a>
          <Stack spacing={4} mt="10">
            <h1>   ^|^f 7100</h1>
          </Stack>
        </HStack>
      </Container>

      <div>
        <MostrarImagen />
        <Heading background='0' opacity='100' as="h1" fontSize="2.1x" className="header" textAlign="center">
          <div style={{ position: 'fixed', top: 150, left: 0, width: "100%", height: "100%", fontFamily: 'Albertus BLACK' }}>
            Departamento de <br /> Tecnolog      as de la <br /> Informaci      n
            <div>
              <Button style={{ width: '250px', fontSize: '30px', padding: '50px' }} colorScheme="orange" textAlign="center" onClick={() => router.push('./producto/produc_index')}>Inventario</Button>
              <Button style={{ width: '250px', fontSize: '30px', padding: '50px', marginLeft: '20px' }} colorScheme="orange" textAlign="center" onClick={() => router.push('./entrega/entrega_index')}>Entrega</Button>
            </div>
          </div>
        </Heading>
      </div>
    </div>
  );
};

export default Index;