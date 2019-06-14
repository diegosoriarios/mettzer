import React, { Components } from 'react'

class Login extends Components {
    constructor(props){
        super(props)
        this.state = {
            nome: '',
            email: '',
            senha: ''
        }
    }

    render() {
        const {nome, email, senha} = this.state
        return(
            <form>
                <input 
                    type="text"
                    value={nome}
                />
                <input 
                    type="email"
                    value={email}
                />
                <input 
                    type="password"
                    value={senha}
                />
                <input
                    type="submit"
                />
            </form>
        );
    }
}

export default Login