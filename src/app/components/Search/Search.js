import React, { Component } from 'react';
import axios from 'axios';
import classes from './Search.css';
import Spinner from '../../containers/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../containers/store/actions/index';

import NavigationItem from '../../containers/navigationItem/NavigationItem';

class Search extends Component {

    state = {
        GenderList: [],
        searchList: [],
        width: null,
        page: 1,
        url: null,
        inputValue: this.props.inputValue,
        loading: false
    }
    componentWillMount() {
        this.setState({inputValue: this.props.inputValue});
    }
    componentDidMount() {
        let page = this.state.page;
        let get3 = page + 3;
        for(let i=page; i<get3; i++){
            this.getList(i);
        }
        this.setState({page: this.state.page + 3});
        window.addEventListener('resize', this.windowResize);
        window.addEventListener('scroll', this.windowScrolling);
        this.windowResize();
    }
    
    windowResize = () => {
        this.setState({width: window.innerWidth * 12 / 100});
    }
    windowScrolling = (e) => {
        const scrollPosition = e.target.scrollingElement.scrollTop + window.innerHeight;
        const scrollHeight = document.body.scrollHeight;
        if(scrollPosition === scrollHeight){
            this.setState({page: this.state.page + 1});
            this.getList(this.state.page);
        }
    }
    getSearch = () => {
        const URL = `https://api.themoviedb.org/3/search/movie?api_key={YOUR API KEY}&language=en-US&query=${this.props.inputValue}&page=1&include_adult=false`;
        const lista = [];
        axios.get(URL)
            .then(response => {
                const data = response.data.results;
                for(let key in data){
                    lista.push(
                        {
                            key: data[key].id,
                            id: data[key].id,
                            title: data[key].title,
                            poster: data[key].poster_path,
                            backdrop: data[key].backdrop_path
                        });
                }
                this.setState({GenderList: [...lista], inputValue: this.props.inputValue});
            })
            .catch(error => {
                console.log(error)
            });
    
    }
    getList = (i) => {
        const URL = `https://api.themoviedb.org/3/discover/movie?api_key={YOUR API KEY}&page=${i}&with_genres=${this.props.match.params.id}`;
        const lista = [];
        this.setState({loading: true});
            axios.get(URL)
            .then(response => {
                const data = response.data.results;
                for(let key in data){
                    lista.push(
                        {
                            key: data[key].id,
                            id: data[key].id,
                            title: data[key].title,
                            poster: data[key].poster_path,
                            backdrop: data[key].backdrop_path
                        });
                }
                this.setState({GenderList: [...this.state.GenderList, ...lista], page: this.state.page + 1})
                this.setState({loading: false});
            })
            .catch(error => {
                console.log(error)
            });
        
    }

    elemInfo = (e) => {
        this.props.sendTargetData(this.state.GenderList[e.target.attributes[0].nodeValue]);
    }
   
    render () {
        if(this.props.inputValue != this.state.inputValue && this.props.inputValue != undefined){
            this.getSearch();
        }
        
        let movies=null;
        if(this.state.GenderList){
            movies= (
                this.state.GenderList.map((elem, index)=> (
                    <div className={classes.midiv} ref={'midivRef'} key={index}>
                        <NavigationItem link={`/elementInfo/${elem.id}`} exact>
                            <img
                                key={elem.id}
                                id={index}
                                src={("https://image.tmdb.org/t/p/w780"+elem.poster)}
                                alt=''
                                ref={'ref'+index}
                                className={classes.image}
                                onClick= {(e) => this.elemInfo(e)}>
                            </img>
                        </NavigationItem>
                    </div>
                ))
            )
        }
        let divPrincipal = {
            width: `${window.innerWidth - 3}px`,
            transition: `all 2s`
        }
        if(this.props.leftValue === 250){
            divPrincipal = {
                width: `${window.innerWidth - 262}px`
            }
        }
        let loading = null
        this.state.loading ? loading = (<Spinner />) : null;

        return (
            
            <div className={classes.divPrincipal} style={divPrincipal}>
                <div className={classes.list} ref={'divref'}>
                    {movies}
                </div> 
                <div className={classes.loading}>{loading}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        leftValue: state.elementInfo.left,
        inputValue: state.elementInfo.inputValue
    }
}
const mapDispatchToProps = dispatch => {
    return {
        sendTargetData: (datos) => dispatch(actions.target(datos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
