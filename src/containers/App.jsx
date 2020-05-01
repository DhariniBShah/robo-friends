import React ,  { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField } from '../Action';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: []
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({ robots: users })
        })
    }

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter( robot => {
            return (
                robot.name.toLowerCase()
                .includes(searchField.toLowerCase())
            );
        })
        if(!robots.length){
            return <h2>Loading...</h2>
        }else{
            return (
                <div className = 'tc'>
                    <h1 className = 'f1'>Robo Friends</h1>
                    <SearchBox searchChange = { onSearchChange } />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = { filteredRobots }/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);