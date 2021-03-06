import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Home from './components/Home'
import Users from './components/Users'
import { connect } from 'react-redux'
import { fetchApi, loadMore, createAccount, userIsLogged } from './actions/Functions'

class App extends Component {
  state = {
    pesquisa: '',
  }

  /**
   * Faz a busca dos artigos sobre o tema escolhido
   * @param {event} e evento disparado quando submit o form
   * @return pesquisa
   */
  handleForm = e => {
    e.preventDefault()
    this.props.fetchApi(this.state.pesquisa, 1)
  }

  /**
   * Faz o logout da conta do usuário
   */
  logOut = () => {
    localStorage.clear()
    this.props.userIsLogged(false)
  }

  /**
   * Adiciona o react-router e a nav bar
   */
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Mettzer</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={this.props.functions.isLogged ? "collapse navbar-collapse" : "d-none"} id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/users/" className="nav-link text-capitalize">{this.props.functions.user.username}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={() => this.logOut()}>Sair</Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0" onSubmit={this.handleForm.bind(this)}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.pesquisa} 
                id="pesquisa" name="pesquisa" value={this.state.pesquisa} onChange={e => this.setState({pesquisa: e.target.value})}/>
                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>

            <div className={!this.props.functions.isLogged ? "collapse navbar-collapse" : "d-none"} id="navbarSupportedContent">
              <div className="text-right container-fluid">
                <Link to="/" className="navbar-text nav-link" onClick={() => this.props.createAccount(!this.props.functions.signin) }>{this.props.functions.signin ? 'Login' : 'Criar conta'}</Link>
              </div>
            </div>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/users/" component={Users} />
        </div>
      </Router>
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
      createAccount: (bool) => dispatch(createAccount(bool)),
      userIsLogged: (bool) => dispatch(userIsLogged(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)