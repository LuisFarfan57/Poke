//Este ejemplo lo que hace es jalar los datos del fetch. Y como estos NO VAN A CAMBIAR se genera
//un HTML estatico al hacer el build que ya trae todas las propiedades quemadas. Esto mejora la velocidad.

const Pokemon = ({ pokemon }) => {
  return (
    <li>{pokemon.name}</li>
  )
}

export default function Pokemones({ pokemones }) {
  return (
    <div>
      <p>Pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
      </ul>
    </div>
  )
}

//Esto le indica que queremos que se genere un html estatico al momento de hacer el build. Esto causara que el fetch se haga antes de
//cargar la pagina, y hasta que las propiedades se pasen, se renderizara
//La funcion se debe llamar asi
export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  //Tienen que estar la propiedad props, para que se le pase al componente
  return {
    props: { pokemones: data.results }
  }
}