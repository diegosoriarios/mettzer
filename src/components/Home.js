import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios'

const API_KEY = 'Y8npoHmwdkq6xWJMBRcyvF2i4h5Te1tV'

class Home extends Component {
    state = {
        logged: false
    }

    fetchApi = () => {
        axios.get('https://core.ac.uk:443/api-v2/articles/get?metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=Y8npoHmwdkq6xWJMBRcyvF2i4h5Te1tV', {
            "query": "java",
            "page": 0,
            "pageSize": 0
        }).then(response => {
            return response.json()
        }).then(response => {
            console.log(response)
        })
    }

    render() {
        if(!this.state.logged) {
            return (
                <div>
                    <h1>Home</h1>
                    {this.fetchApi()}
                </div>
            );
        }else {
            return <Login />
        }
    }
}

export default Home