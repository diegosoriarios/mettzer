import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchApi, loadMore } from '../actions/Functions'
import axios from 'axios'

class Users extends Component {
    state = {
        response: []
    }

    componentDidMount = () => {
        console.log(this.props.user.user._id)
        axios.get(`http://localhost:3777/users/${this.props.user.user._id}`)
            .then(response => {
                return response.data
            })
            .then(response => {
                this.setState({
                    response: response.savedPosts
                })
            })
    }

    renderResponse = () => {
        console.log(this.state.response)
        if(this.state.response !== undefined) {
            return this.state.response.map((obj, i) => {
                return (
                    <li className="card" key={i} >
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-md-9">{obj.title}</h5>
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
    
    render() {
        return(
            <div className="container">
                <ul style={{display: this.state.response.length > 0 ? 'block' : 'none'}}>
                    {this.renderResponse()}
                    <button onClick={() => this.handler()} className="bg-primary btn-more">+</button>
                </ul>
            </div>
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
        user: state.saveUser
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchApi: (query, page) => dispatch(fetchApi(query, page)),
        loadMore: (pages) => dispatch(loadMore(pages)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Users)