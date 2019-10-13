import React, { Component } from 'react';
import classes from './ElementInfo.css';

import axios from 'axios';
import ListCreator from '../../containers/listCreator/ListCreator';



class ElementInfo extends Component {
    state = {
        width: window.innerWidth,
        data: '',
        video: {id:'ID', name:'NAME'},
        url: null,
    }
    componentWillMount(){
        this.getData();
        window.scrollTo(0, 0);
    }
    componentDidMount(){
        window.addEventListener('resize', this.windowResize);
    }
    
    windowResize = () => {
        this.setState({width: window.innerWidth});
    }

    getData = () => {
        let genres = '';
        let url = this.props.location.pathname.match(/\d+/)[0];
        if(this.state.url){url = this.state.url};
        axios.get(`https://api.themoviedb.org/3/movie/${url}?api_key={YOUR API KEY}`)
            .then(response => {
                response.data.genres.map(elem => {
                    genres = genres.concat(elem.name+' ');
                });
                const getData = {
                    key: response.data.id,
                    id: response.data.id,
                    title: response.data.title,
                    overview: response.data.overview,
                    release_date: response.data.release_date,
                    vote_average: response.data.vote_average,
                    runtime: response.data.runtime,
                    genres: genres,
                    poster_path: response.data.poster_path,
                    backdrop_path: response.data.backdrop_path
                    };
                this.setState({data: getData});
            })
            .catch( error => {
                console.log(error)
            } );
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.location.pathname.match(/\d+/)[0]}/videos?api_key={YOUR API KEY}`)
            .then(response => {
                const videoData = this.state.video;
                videoData.id = response.data.results[0].key;
                videoData.name = response.data.results[0].name;
                this.setState({video: videoData});
            })
            .catch( error  => {
                console.log(error)
            });
    }

    redirect = (e) => {
        this.setState({url: e.target.parentNode.attributes.href.nodeValue});
        this.props.history.location.pathname=e.target.parentNode.attributes.href.nodeValue;
    }



    render(){
        
        var backdrop_path, imageStyle, degradadoStyle, titleStyle, dataDivStyle, info, videoStyle = null;
        let video = `https://www.youtube.com/embed/${this.state.video.id}`;

        if(this.state.data.backdrop_path){
            backdrop_path = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original${this.state.data.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: `${window.innerWidth}px`,
                height: `550px`
            }
        }
        
        if(window.innerWidth > 1800){
            imageStyle = {
                width: `${((window.innerWidth * 15) / 100)}px`,
                top: `${((window.innerWidth * 30) / 100) - ((window.innerWidth * 15) / 100)}px`,
                left: `${((window.innerWidth * 2) / 100)}px`,
                margin: 'auto'
            }
            titleStyle = {
                top: `${((window.innerWidth * 30) / 100) - 100}px`,
                left: `${((window.innerWidth * 20) / 100)}px`,
                fontSize: '20px'
            }
            info = {
                fontSize: '22px'
            }
        }
        if(window.innerWidth > 1100){
            let width = (window.innerWidth * 60) / 100;
            videoStyle = {
                marginLeft: 'auto',
                height: `${(width * 56.92) / 100}px`,
                width: `${width}px`
            }
            dataDivStyle = {
                width: `${width}px`,
                marginLeft: `${(window.innerWidth / 2) - (width / 2)}px`
            }
            backdrop_path = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original${this.state.data.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: `${this.state.width}px`,
                height: `${(window.innerWidth * 30) / 100}px`
            }
            degradadoStyle = {
                top: `${((window.innerWidth * 30) / 100) - 48}px`
            }
            imageStyle = {
                top: `${((window.innerWidth * 30) / 100) - 150}px`
            }
            titleStyle = {
                top: `${((window.innerWidth * 30) / 100) - 90}px`
            }
            
            
        }
        if(window.innerWidth <= 980){
            backdrop_path = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original${this.state.data.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                width: `${this.state.width}px`,
                height: `${(window.innerWidth / 1.7)}px`,
                minHeight: '300px',
                marginTop: '-15px'
            }
            imageStyle = {
                width: '110px',
                top: `${(window.innerWidth / 1.7) - 150}px`,
                left: '20px',
                margin: 'auto'
            }
            degradadoStyle = {
                top: `${((window.innerWidth / 1.7) - 71)}px`
            }
            titleStyle = {
                top: `${(window.innerWidth / 1.7) - 80}px`,
                left: '150px',
                fontSize: '12px'
            }
            dataDivStyle = {
                marginTop: '50px',
                marginLeft: '0px',
                width: `${window.innerWidth - 12}px`
            }
        }
        if(window.innerWidth < 700){
            videoStyle = {
                height: `${((window.innerWidth * 56.92) / 100 + 20)}px`,
                width: `${window.innerWidth}px`
            }
            
        }
        if(window.innerWidth <= 540){
            backdrop_path = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original${this.state.data.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: `${this.state.width}px`,
                height: `${(window.innerWidth / 1.8)}px`,
                minHeight: '300px',
                height:'300px'
            }
            
            degradadoStyle = {
                top: `251px`
            }
            imageStyle = {
                width: '90px',
                top: `180px`,
                left: '10px',
                margin: 'auto'
            }
            titleStyle = {
                top: `230px`,
                left: '130px',
                fontSize: '8px',
                width: '200px'
            }
        }

        let popular= (
            <ListCreator
                key={1}
                id={1}
                portada={true}
                url={`https://api.themoviedb.org/3/movie/popular?api_key={YOUR API KEY}&language=en-US&page=`}
            />
        )

        return(
            
            <div className={classes.divPrincipal}>
                
                <div className={classes.gradient}>

                    <div className={classes.backdrop_path} style={backdrop_path}>
                        <div className={classes.title} style={titleStyle}><h1>{this.state.data.title}</h1></div>
                    </div>

                    <div className={classes.degradado}></div>
                    <div className={classes.degradado2} style={degradadoStyle}></div>

                    <div className={classes.datDiv} style={dataDivStyle}>
                        <div className={classes.video}>
                            <iframe 
                                width="650" 
                                height="370"
                                src={video}
                                style={videoStyle}>
                            </iframe>
                            <div style={info}>
                                <p>Original Release: {this.state.data.release_date}</p>
                                <p>Vote Average: {this.state.data.vote_average}</p>
                                <p>RunTime: {this.state.data.runtime}</p>
                                <p>Genre: {this.state.data.genres}</p>
                                <p>Lenguage: {this.state.data.lenguage}</p>
                                <p className={classes.overview}>Overview:</p>
                                <p className={classes.overview}>{this.state.data.overview}</p>
                                
                            </div> 
                        </div>
                    </div>

                    <div className={classes.divList} onClick={(e) => this.redirect(e)}>
                        {popular}
                    </div>
                    <div className={classes.HiddeScrollBar}></div>                         
                    <img className={classes.poster} style={imageStyle} src={`https://image.tmdb.org/t/p/w780${this.state.data.poster_path}`}></img>
                    
                </div>
                
            </div>
            
        )
    }
}
export default ElementInfo;
