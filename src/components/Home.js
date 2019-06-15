import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios'

const API_KEY = 'Y8npoHmwdkq6xWJMBRcyvF2i4h5Te1tV'

class Home extends Component {
    state = {
        logged: false,
        pesquisa: '',
        response: []
    }

    fetchApi = query => {
        console.log(query)
        axios.get(`https://core.ac.uk/api-v2/search/${query}?page=1&pageSize=10&apiKey=${API_KEY}`)
        .then(response => {
            return response.data
        })
        .then(response => {
            response.forEach(obj => {
                this.setState({
                    response: this.state.response.push(obj)
                })
            })
        })
    }

    renderResponse = () => {
        if(this.state.response != undefined) {
            return this.state.response.map((obj, i) => {
                return (
                    <li>
                        <p>{i}</p>
                    </li>
                );
            })
        }
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
                    <ul>
                        {this.renderResponse()}
                    </ul>
                </div>
            );
        }else {
            return <Login />
        }
    }
}

export default Home