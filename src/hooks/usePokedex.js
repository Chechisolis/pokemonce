import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { paginationLogic } from "../utils/pagination"

const usePokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [types, setTypes] = useState([])
  const [selecttype, setSelectType] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleChangeSelect = (e) => {
    setSelectType(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1
    if (nextPage > lastPage){
      setCurrentPage(1)
    }else {
      setCurrentPage(nextPage)
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    if (newPage < 1) {
      setCurrentPage(lastPage)
    } else {
      setCurrentPage(newPage)
    }
  }

  

  const {pagesInBlock, lastPage, pokemonsInpage} = useMemo(() => {
    return paginationLogic(pokemonsFilter, currentPage)
  }, [pokemonsFilter, currentPage])


  //arribafalta terminar el código
  useEffect(() => {

    const URL= `https://pokeapi.co/api/v2/${selecttype ? `type/${selecttype}/` : "pokemon/?limit=1279"}`
     axios.get(URL)
     .then((res) => {
      if(selecttype){
        const pokemonByType = res.data.pokemon.map(pokemon => {
          return{
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url
          }
        } )
        setPokemons(pokemonByType)
      }else{
        setPokemons(res.data.results)
      }
      
    })
     .catch((err) => console.log(err))
    
    },[selecttype])

  useEffect(() => {
    const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
    setPokemonsFilter(pokemonByName)
  }, [pokemonName, pokemons])

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/"
    axios.get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemons])

  return {
    handleSubmit,  
    handleChangeSelect,
    types,
    pokemonsInpage,
    handlePreviousPage,
    handleNextPage,
    pagesInBlock,
    setCurrentPage,
    lastPage
  }
}

export default usePokedex