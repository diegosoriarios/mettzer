import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userIsLogged, saveUser } from '../actions/Functions'
import axios from 'axios'
import { URL } from '../actions/Types'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            nome: '',
            email: '',
            senha: '',
            confirmaSenha: '',
            users: [],
        }
    }

    /**
     * É chamada assim que o componente é carregado
     * Se um login foi salvo no localStorage loga automático
     * Se não tiver, retorna todos os usuários para logar
     */
    componentDidMount = () => {
        let user = localStorage.getItem('user')
        if(user !== null) {
            this.props.saveUser(JSON.parse(user))
            this.props.userIsLogged(true)
        } else {
            axios.get(`${URL}/users`)
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

    /**
     * Cuida de alterar os inputs
     * @param {event} e valor sendo alterado no input
     * @return {state} altera o valor do state com o nome correspondente
     */
    handleInput = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    /**
     * É chamada assim que o botão de submit é clicado
     * @param {event} e evento disparado ao submitt
     * @return {state} loga na conta 
     */
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
    
    /**
     * Cria um novo usuário com a username, email, password
     * @param {event} e evento disparado no submit
     * @return {state} cria um novo usuário
     */
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

    /**
     * Ao clicar um no usuário, autocompleta o input de username e mail
     * @param {obj} obj usuário selecionado
     */
    autoComplete = obj => {
        this.setState({
            nome: obj.username,
            email: obj.email,
        })
    }

    /**
     * Verifcia se a senha e a confirmação são iguais
     * @return {boolean} true se forem diferentes e false se forem iguais
     */
    passwordCorrect = () => {
        if(this.state.confirmaSenha === this.state.senha && this.state.senha.length > 0) {
            return false
        }
        return true
    }

    /**
     * Se selecionar login mostra os inputs de login e os usuários logados
     * Se selecionar criar conta retorna a tela de criar conta
     */
    render() {
        const {nome, email, senha, confirmaSenha } = this.state
        if(!this.props.functions.signin) {
            return(
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col-sm-6">
                            <h2 className="text-center m-3">Login</h2>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername">Username</label>
                                <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" name="nome" value={nome} onChange={this.handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" value={email} onChange={this.handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="senha">Senha</label>
                                <input type="password" className="form-control" id="senha" placeholder="Senha" name="senha" value={senha} onChange={this.handleInput} />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <div className=" col-6">
                            <h2 className="text-center m-3">Users</h2>
                        
                            <ul className="list-group text-center m-5">
                            
                                {this.state.users.map((user, i) => (
                                    <li key={i} className="list-group-item text-capitalize" onClick={() => this.autoComplete(user)}>{user.username}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <form onSubmit={this.createUser} className="container">
                    <h2 className="text-center m-3">Criar conta</h2>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" name="nome" value={nome} onChange={this.handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" value={email} onChange={this.handleInput} />
                        <small id="emailHelp" className="form-text text-muted">Não vamos compartilhar o seu e-mail com ninguém</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" className="form-control" id="senha" placeholder="Senha" name="senha" value={senha} onChange={this.handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmaSenha">Confirma Senha</label>
                        <input type="password" className="form-control" id="confirmaSenha" placeholder="Confirma Senha" name="confirmaSenha" value={confirmaSenha} onChange={this.handleInput} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.passwordCorrect()}>Criar conta</button>
                </form>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        functions: state.getUserFunction,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userIsLogged: (bool) => dispatch(userIsLogged(bool)),
        saveUser: (user) => dispatch(saveUser(user))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);