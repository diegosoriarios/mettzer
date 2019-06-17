import React, { Component } from 'react'
import Login from './Login'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { fetchApi, loadMore } from '../actions/Functions'

class Home extends Component {
    renderResponse = () => {
        if(this.props.response !== undefined) {
            return this.props.response.response.map((obj, i) => {
                return (
                    <li className="card" key={i} >
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-md-9">{obj.title}</h5>
                                <FontAwesomeIcon className="col-md-3" size="2x" icon={faHeart} />
                            </div>
                            {obj.authors.map((name, ind) => (
                                <h6 className="card-subtitle mb-2 text-muted" key={ind}>{name}</h6>
                            ))}
                            
                            <p className="card-text description">{
                                obj.description !== null && obj.description.length >= 97 ? 
                                    obj.description.substring(0, 97) + '...' 
                                : 
                                    obj.description}
                            </p>

                            {obj.urls.map((link, idx) => (
                                <a href={link} rel="noopener noreferrer" className="card-link" target="_blank" key={idx}>Link {idx + 1}</a>
                            ))}
                        </div>
                    </li>
                )
            })
        }
    }

    handler = () => {
        this.props.loadMore()
        console.log(this.props.query.query)
        this.props.fetchApi(this.props.query.query, this.props.query.page + 1);
    }

    render() {
        if(this.props.isLogged) {
            return (
                <div className="container">
                    <h1 className="text-center">Home</h1>
                    <ul>
                        {this.renderResponse()}
                        <button onClick={() => this.handler()} className="bg-primary btn-more">+</button>
                    </ul>
                </div>
            )
        }else {
            return <Login />
        }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)