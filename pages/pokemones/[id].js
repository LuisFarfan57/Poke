import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
    const router = useRouter()
    console.log(router)

    //Cuando el fallback esta en true, el archivo se generara bajo demanda. Y ahi se ejecutara el
    //fetch. Luego de esto, se genera un HTML con la nueva ruta que no estaba precreada
    //Ya no es necesario cuando se usa el blocking en el fallback
    // if (router.isFallback) {
    //     return <p>Cargando...</p>
    // }

    return (
        <div>
            <h1>{data.name} número #{data.id}</h1>
            {/* No se pueden agregar imagenes fuera de nuestra pagina */}
            {/* Para hacer esto hay que ir al next.config.js */}
            <Image src={data.sprites.front_default} width='400' height='400' />
            <Link href='/'>Volver al inicio</Link>
        </div>
    )
}

export default Pokemon

//Para hacer el server site rendering
//Esta se llama en cada request
// export const getServerSideProps = async ({params}) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//     const data = await response.json()

//     return { 
//         props: { 
//             data 
//         } 
//     }
// }

export const getStaticPaths = async () => {
    //Tiene que retornar un objeto asi
    const paths = [
        //El id tiene que ser string, no puede ser numero
        { params: { id: '1' } },
        { params: { id: '2' } }
    ]

    //Lo que hace esto es generar el html de estas rutas nada mas. Entonces si intentamos
    //ir a otra ruta que no esta, dara error. Esto si el fallback esta en false
    return {
        paths,
        //Esta es una alternativa, pero habra que verificar el isFallback. Devuelve el componente, lo construye, y lo entrega
        // fallback: true
        //Esto hace que no sea necesario verificar el isFallback. Retorna el html una vez
        //es generado por next
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params}) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { 
        props: { 
            data 
        } 
    }
}