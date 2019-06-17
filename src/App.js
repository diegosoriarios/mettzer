import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Home from './components/Home'
import { connect } from 'react-redux'
import { fetchApi, loadMore } from './actions/Functions'

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class App extends Component {
  state = {
    pesquisa: '',
  }

  handleForm = e => {
    e.preventDefault()
    this.props.fetchApi(this.state.pesquisa, 1)
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Mettzer</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about/" className="nav-link">About</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" href="#">Action</Link>
                    <Link className="dropdown-item" href="#">Another action</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" href="#">Something else here</Link>
                  </div>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0" onSubmit={this.handleForm.bind(this)}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.pesquisa} 
                id="pesquisa" name="pesquisa" value={this.state.pesquisa} onChange={e => this.setState({pesquisa: e.target.value})}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isLoading: state.pageIsLoading,
      isLogged: state.userIsLogged,
      response: state.fetchSuccess,
      page: state.loadMore,
      query: state.changeString,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchApi: (query, page) => dispatch(fetchApi(query, page)),
      loadMore: (pages) => dispatch(loadMore(pages)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)