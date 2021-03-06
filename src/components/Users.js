import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchApi, loadMore } from '../actions/Functions'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { URL } from '../actions/Types'

class Users extends Component {
    state = {
        response: []
    }

    /**
     * Assim que o componente é carregado atualiza a lista de posts mostrados
     */
    componentDidMount = () => {
        this.showSavedPosts()
    }

    /**
     * Faz a request e armazenas os dados de um usuário
     */
    showSavedPosts = () => {
        if(this.props.functions.user._id) {
            axios.get(`${URL}/users/${this.props.functions.user._id}`)
            .then(response => {
                return response.data
            })
            .then(response => {
                this.setState({
                    response: response.savedPosts
                })
                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(response))
            })
        }        
    }

    /**
     * Remove artigo da lista dos artigos favoritos
     * @param {obj} obj artigo selecionado
     */
    unSavePost = obj => {
        axios.delete(`${URL}/users/${this.props.functions.user._id}/savedPosts/${obj.id}`)
            .then(() => {
                this.showSavedPosts()
            })
    }

    /**
     * Renderiza todos os artigos salvo dos usuários
     */
    renderResponse = () => {
        console.log(this.state.response)
        if(this.state.response !== undefined) {
            return this.state.response.map((obj, i) => {
                return (
                    <li className="card" key={i} >
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-md-9">{obj.title}</h5>
                                <FontAwesomeIcon className="col-md-3" style={{color: 'red'}} size="2x" icon={faHeart} onClick={() => this.unSavePost(obj)} />
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
     * Renderiz a lista de artigos se tiver no minimo um artigo
     */
    render() {
        return(
            <div className="container">
                <ul style={{display: this.state.response && this.state.response.length > 0 ? 'block' : 'none'}}>
                    {this.renderResponse()}
                </ul>
            </div>
        );
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Users)