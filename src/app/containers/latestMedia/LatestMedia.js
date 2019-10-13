import React, { Component } from 'react';
import classes from './LatestMedia.css';

import axios from 'axios';

import StarRange from './starRange/StarRange';

class LatestMedia extends Component {

    state = {
        dataDBList: [],
        windowWidht: null,
        miEleccion: 0
    }
    componentWillMount () {
        window.addEventListener('resize', this.resizeHandle);
        this.getLatest();
        this.resizeHandle();
    }
    getLatest = () => {
        const posts = [];
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=&language=en-US&page=1')
            .then(response => {
                const datos = response.data.results;
                for( let key in datos){
                    posts.push({
                        key: datos[key].id,
                        id: datos[key].id
                    });
                }
                this.setState(state => ({dataDBList: state.dataDBList = posts}));
                var miRandom = Math.floor((Math.random() * 19) + 0);
                var miEleccion = this.state.dataDBList[miRandom]; 
                axios.get(`https://api.themoviedb.org/3/movie/${miEleccion.id}?api_key=`)
                    .then(response => {
                        const posts2 = {
                            key: response.data.id,
                            id: response.data.id,
                            title: response.data.title,
                            description: response.data.overview,
                            poster: response.data.poster_path,
                            backdrop: response.data.backdrop_path,
                            runTime: response.data.runtime,
                            release_date: response.data.release_date,
                            vote_average: response.data.vote_average
                        };
                        this.setState({miEleccion: posts2});
                    })
                    .catch( error => {
                        console.log(error)
                    } );
            })
            .catch( error => {
                console.log(error);
            } );
    }
    resizeHandle = () => {
        this.setState({windowWidht: window.innerWidth});
    }

    render(){
        var descriptionStyle = null;
        var titleStyle = null;
        var URL= `https://image.tmdb.org/t/p/w780${this.state.miEleccion.backdrop}`;
        var principalDiv = {
            width: `${window.innerWidth}px`
        }
        var backgroundImage = {
            backgroundImage: `url(${URL})`,
            width: `${window.innerWidth * 70 / 100}px`
        }
        var gradient = {
            width: `${(window.innerWidth * 70 / 100)}px`
        }
        if(window.innerWidth < 800){
            descriptionStyle = {
                fontSize: '11px',
                left: '20px',
                width: '400px',
                top: `${((window.innerWidth / 1.8) - 160)}px`,
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
            }
            titleStyle = {
                fontSize: '22px',
                left: '20px',
                top: `${((window.innerWidth / 1.8) - 210)}px`,
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
            }
            backgroundImage = {
                backgroundImage: `url(${URL})`,
                backgroundSize: 'contain',
                margin: '0',
                height: `${(window.innerWidth / 1.7)}px`,
                width: `800px`
            }
            gradient = {
                width: `${window.innerWidth}px`,
                height: `${(window.innerWidth / 1.7)}px`,
                background: 'linear-gradient(to top, #0d0d0d 3%, transparent 15%)'
             }
        }
        if(window.innerWidth <= 500){
            backgroundImage = {
                backgroundImage: `url(${URL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: 'none',
                height: `250px`,
                width: '100%'
            }
            gradient = {
                width: `${window.innerWidth}px`,
                height: `250px`,
                background: 'linear-gradient(to top, #0d0d0d 3%, transparent 15%)'
             }
             descriptionStyle = {
                fontSize: '10px',
                left: '15px',
                width: '300px',
                top: `170px`,
                height: '70px',
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
            }
            titleStyle = {
                fontSize: '20px',
                left: '15px',
                top: `120px`,
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px'
            }
        }
        if(window.innerWidth > 1500){
            backgroundImage = {
                backgroundImage: `url(${URL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: 'none',
                marginLeft: `${(window.innerWidth * 30) / 100}px`,
                height: `${(window.innerWidth * 30) / 100}px`,
                width: `${(window.innerWidth * 70) / 100}px`
            }
            gradient = {
                width: `${window.innerWidth}px`,
                height: `${(window.innerWidth * 30) / 100}px`,
                background: 'linear-gradient(to right, #0d0d0d 1%, transparent 20%), linear-gradient(to top, #0d0d0d 3%, transparent 30%)'
             }
        }

        return(
            <div className={classes.principalDiv} style={principalDiv}>
                <p className={classes.title} style={titleStyle}>{this.state.miEleccion.title}</p> 
                <div className={classes.description} style={descriptionStyle}>
                    <StarRange 
                        date= {this.state.miEleccion.release_date}
                        average= {this.state.miEleccion.vote_average}
                        runTime= {this.state.miEleccion.runTime}
                    />
                    <div className={classes.descriptionDiv}>
                        {this.state.miEleccion.description}
                    </div>
                    
                </div> 
                <div className={classes.backgroundImage} style={backgroundImage}>      
                    <div className={classes.gradient} style={gradient}></div> 
                </div>

            </div>
                
            
        )
    }
}

export default LatestMedia;