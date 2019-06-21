import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userIsLogged, saveUser } from '../actions/Functions'
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            nome: '',
            email: '',
            senha: '',
            users: [],
        }
    }

    componentDidMount = () => {
        let user = localStorage.getItem('user')
        if(user !== null) {
            this.props.saveUser(JSON.parse(user))
            this.props.userIsLogged(true)
        } else {
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
                if(user.password === this.state.senha) {
                    localStorage.setItem('user', JSON.stringify(user))
                    this.props.saveUser(user)
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
        if(!this.props.signup.signin) {
            return(
                <form onSubmit={this.handleSubmit} className="container">
                    <h2 className="text-center m-3">Login</h2>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" name="nome" value={nome} onChange={this.handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" value={email} onChange={this.handleInput} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" name="senha" value={senha} onChange={this.handleInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            );
        } else {
            return(
                <form onSubmit={this.createUser} className="container">
                    <h2 className="text-center m-3">Criar conta</h2>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" value={nome} onChange={this.handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" value={email} onChange={this.handleInput} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" value={senha} onChange={this.handleInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">Criar conta</button>
                </form>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.pageIsLoading,
        isLogged: state.userIsLogged,
        signup: state.createAccount,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userIsLogged: (bool) => dispatch(userIsLogged(bool)),
        saveUser: (user) => dispatch(saveUser(user))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);