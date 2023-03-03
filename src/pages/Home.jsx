import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'
import "./styles/Home.css"

const Home = () => {

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainerGlobal(nameTrainer))
  }

  return (
    <main>
      <section className='home'>
        <div className='home__img'>
          <img src="/images/pokedex.png" alt="" />
        </div>
        <h2 className='home__salude'>¡Hello Trainer!</h2>
        <p className='home__pp'>Give me your name to start!</p>
        <form className='home__form' onSubmit={handleSubmit}>
          <input className='home__your' required id='nameTrainer' type="text" placeholder= ' your name' autoComplete='off' />
          <button className='home__btn'>Start</button>
        </form>
        <div className='red1'></div>
        <div className='black1'>
          <div className='circle'>
            <div className='circle__2'></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home