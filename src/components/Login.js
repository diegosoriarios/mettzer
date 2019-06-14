import React, { Component } from 'react'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            nome: '',
            email: '',
            senha: ''
        }
    }

    handleInput = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        console.log(this.state)
        e.preventDefault()
    }

    render() {
        const {nome, email, senha} = this.state
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
    }
}

export default Login