import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userIsLogged } from '../actions/Functions'
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            nome: '',
            email: '',
            senha: '',
            users: [],
            login: false,
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3777/users')
            .then(response => {
                return response.data
            })
            .then(response => {
                console.log(response)
                this.setState({
                    users: response
                })
            })
    }

    handleInput = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.state.users.forEach(user => {
            if(user.username === this.state.nome || user.email === this.state.email ){
                console.log(user)
                if(user.password === this.state.senha) {
                    console.log('Logado')
                    this.props.userIsLogged(true)
                }
            }
        })
    }

    createUser = e => {
        e.preventDefault()

        const body = JSON.stringify({
            username: this.state.nome,
            email: this.state.email,
            password: this.state.senha,
        })

        console.log(body)

        axios.post('http://localhost:3777/users', body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.err(err)
        })
    }

    render() {
        const {nome, email, senha} = this.state
        if(this.state.login) {
            return(
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Nome</label>
                    <input 
                        type="text"
                        value={nome}
                        name={'nome'}
                        id="name"
                        onChange={this.handleInput}
                    /> <br />
    
                    <label htmlFor="name">Email</label>
                    <input 
                        type="email"
                        value={email}
                        name={'email'}
                        id="email"
                        onChange={this.handleInput}
                    /> <br />
    
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password"
                        value={senha}
                        name={'senha'}
                        id="password"
                        onChange={this.handleInput}
                    /> <br />
                    <input
                        type="submit"
                    />
                </form>
            );
        } else {
            return(
                <form onSubmit={this.createUser}>
                    <label htmlFor="name">Nome</label>
                    <input 
                        type="text"
                        value={nome}
                        name={'nome'}
                        id="name"
                        onChange={this.handleInput}
                    /> <br />
    
                    <label htmlFor="name">Email</label>
                    <input 
                        type="email"
                        value={email}
                        name={'email'}
                        id="email"
                        onChange={this.handleInput}
                    /> <br />
    
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password"
                        value={senha}
                        name={'senha'}
                        id="password"
                        onChange={this.handleInput}
                    /> <br />
                    <input
                        type="submit"
                        className="btn-primary"
                    />
                </form>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.pageIsLoading,
        isLogged: state.userIsLogged,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userIsLogged: (bool) => dispatch(userIsLogged(bool)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);