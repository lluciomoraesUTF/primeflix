import React from 'react'
import { Link } from 'react-router-dom'
import styles from './erro.module.css'

function Erro() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link to='/'>Veja todos os filmes</Link>
    </div>
  )
}

export default Erro
