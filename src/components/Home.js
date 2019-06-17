import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const API_KEY = 'Y8npoHmwdkq6xWJMBRcyvF2i4h5Te1tV'

class Home extends Component {
    state = {
        logged: false,
        pesquisa: '',
        response: [],
        page: 1,
        query: ''
    }

    fetchApi = query => {
        if(this.state.query !== query) {
            this.setState({
                response: [],
                query
            })
        }
        axios.get(`https://core.ac.uk/api-v2/search/${query}?page=${this.state.page}&pageSize=10&apiKey=${API_KEY}`)
        .then(response => {
            return response.data
        })
        .then(response => {
            console.log(response.data)
            response.data.forEach(obj => {
                this.setState({
                    response: this.state.response.concat(obj._source)
                })
            })
        })
    }

    renderResponse = () => {
        if(this.state.response !== []) {
            return this.state.response.map((obj, i) => {
                console.log(obj)
                return (
                    <li className="card" style={{width: '18rem;'}} key={i} >
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-md-9">{obj.title}</h5>
                                <FontAwesomeIcon className="col-md-3" size="2x" icon={faHeart} />
                            </div>
                            {obj.authors.map(name => (
                                <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
                            ))}
                            
                            <p className="card-text description">{obj.description.length >= 97 ? obj.description.substring(0, 97) + '...' : obj.description}</p>

                            {obj.urls.map((link, idx) => (
                                <a href={link} rel="noopener noreferrer" className="card-link" target="_blank">Link {idx + 1}</a>
                            ))}
                        </div>
                    </li>
                );
            })
        }
    }

    loadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchApi(this.state.query)
        })
    }

    render() {
        const { logged, response, pesquisa } = this.state
        if(!logged) {
            return (
                <div>
                    <h1>Home</h1>
                    <label htmlFor="pesquisa">Pesquisa</label>
                    <input type="text" id="pesquisa" name="pesquisa" value={pesquisa} onChange={e => this.setState({pesquisa: e.target.value})} />
                    <button onClick={() => this.fetchApi(pesquisa)}>Pesquisa</button>
                    <ul hidden={this.state.response === []}>
                        {this.renderResponse()}
                        <button onClick={() => this.loadMore()}>+</button>
                    </ul>
                </div>
            );
        }else {
            return <Login />
        }
    }
}

export default Home