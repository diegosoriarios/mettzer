import React, { Component } from 'react'
import Login from './Login'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { fetchApi, loadMore } from '../actions/Functions'
import axios from 'axios'
import logo from '../assets/empty.svg'
import { URL } from '../actions/Types'

class Home extends Component {

    /**
     * Busca se o post selecionado já foi salvo
     * Se foi salvo, remove da lista
     * Se não foi salvo, adiciona na lista
     * @param {object} obj recebe o post selecionado
     */
    savePost = obj => {
        let isSaved
        if(this.props.functions.user.savedPosts) {
            isSaved = this.props.functions.user.savedPosts.find(post => {
                return obj.id === post.id
            })
        }
        if(isSaved === obj.id) {
            axios.delete(`${URL}/users/${this.props.functions.user._id}`)
        } else {
            axios.put(`${URL}/users/${this.props.functions.user._id}`, obj)
        }
        this.renderResponse()
    }

    /**
     * Busca se o post selecionado já foi salvo
     * Se foi salvo, marca como verdadeiro
     * Se não foi salvo marca como falso
     * @param {object} obj recebe o post selecionado
     * @returns {boolean}
     */
    changeColor = (obj) => {
        let flag = false;
        if(this.props.functions.user.savedPosts) {
            flag = this.props.functions.user.savedPosts.find(list => {
                if(list.id === obj.id) {
                    flag = true
                    return flag
                }
            })
        }
        return flag
    }

    /**
     * Se algum artigo já retornou da busca
     * faz um loop entre todos e mostra
     * @returns {<li>} 
     */
    renderResponse = () => {
        if(this.props.functions.response.length > 0) {
            return this.props.functions.response.map((obj, i) => {
                return (
                    <li className="card text-left" key={i} >
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-md-9">{obj.title}</h5>
                                <FontAwesomeIcon className="col-md-3" style={{color: this.changeColor(obj) ? 'red' : 'black'}} size="2x" icon={faHeart} onClick={() => this.savePost(obj)} />
                            </div>
                            {obj.authors.map((name, ind) => (
                                <h6 className="card-subtitle mb-2 text-muted" key={ind}>{name}</h6>
                            ))}
                            
                            <p className="card-text description">{
                                obj.description !== null && obj.description.length >= 97 ? 
                                    obj.description.substring(0, 97) + '...' 
                                : 
                                    obj.description}
                            </p>

                            {obj.urls.map((link, idx) => (
                                <a href={link} rel="noopener noreferrer" className="card-link" target="_blank" key={idx}>Link {idx + 1}</a>
                            ))}
                        </div>
                    </li>
                )
            })
        }
    }

    /**
     * Carrega mais posts
     */
    handler = () => {
        this.props.loadMore()
        console.log(this.props.functions.query)
        this.props.fetchApi(this.props.functions.query, this.props.functions.page + 1);
    }

    /**
     * Se está logado mostra as buscas
     * Se não está logado retorna a tela de Login
     */
    render() {
        if(this.props.functions.isLogged) {
            return (
                <div className="container">
                    <ul style={{display: this.props.functions.response.length > 0 ? 'block' : 'none'}} className="text-center">
                        {this.renderResponse()}
                        <button onClick={() => this.handler()} className="text-center bg-primary btn-more m-2">+</button>
                    </ul>
                    <div className="text-center mt-5"
                        style={{display: !this.props.functions.response.length > 0 ? 'block' : 'none'}}>
                            <h2>Nada para mostrar</h2>
                            <h3>Faça uma pesquisa para começar</h3>
                            <img src={logo} className="txt-center w-50 m-5 img-fluid" alt="search" />
                    </div>
                </div>
            )
        }else {
            return <Login />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        functions: state.getUserFunction,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchApi: (query, page) => dispatch(fetchApi(query, page)),
        loadMore: (pages) => dispatch(loadMore(pages)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)