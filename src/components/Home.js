import React, { Component } from 'react'
import Login from './Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { fetchApi, loadMore } from '../actions/Functions'

class Home extends Component {
    state = {
        pesquisa: '',
    }

    renderResponse = () => {
        if(this.props.response !== undefined) {
            return this.props.response.response.map((obj, i) => {
                return (
                    <li className="card" style={{width: '18rem'}} key={i} >
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-md-9">{obj.title}</h5>
                                <FontAwesomeIcon className="col-md-3" size="2x" icon={faHeart} />
                            </div>
                            {obj.authors.map((name, ind) => (
                                <h6 className="card-subtitle mb-2 text-muted" key={ind}>{name}</h6>
                            ))}
                            
                            <p className="card-text description">{obj.description.length >= 97 ? obj.description.substring(0, 97) + '...' : obj.description}</p>

                            {obj.urls.map((link, idx) => (
                                <a href={link} rel="noopener noreferrer" className="card-link" target="_blank" key={idx}>Link {idx + 1}</a>
                            ))}
                        </div>
                    </li>
                )
            })
        }
    }

    render() {
        const { pesquisa } = this.state
        if(this.props.isLogged) {
            return (
                <div className="container">
                    <h1>Home</h1>
                    <label htmlFor="pesquisa">Pesquisa</label>
                    <input type="text" id="pesquisa" name="pesquisa" value={pesquisa} onChange={e => this.setState({pesquisa: e.target.value})} />
                    <button onClick={() => this.props.fetchApi(this.state.pesquisa)}>Pesquisa</button>
                    <ul hidden={this.state.response === []}>
                        {this.renderResponse()}
                        <button onClick={() => this.props.loadMore().then(this.props.fetchApi(this.props.query))}>+</button>
                    </ul>
                </div>
            )
        }else {
            return <Login />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.pageIsLoading,
        isLogged: state.userIsLogged,
        response: state.fetchSuccess,
        page: state.loadMore,
        query: state.changeString
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchApi: (query) => dispatch(fetchApi(query)),
        loadMore: (pages) => dispatch(loadMore(pages)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)