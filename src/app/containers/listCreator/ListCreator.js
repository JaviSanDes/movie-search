import React, {Component} from 'react';
import axios from 'axios';
import classes from './ListCreator.css';

import Spinner from '../Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import NavigationItem from '../navigationItem/NavigationItem';

class ListCreator extends Component {
    state = {
        dataDBList: [],
        animation: null,
        page: 1,
        number: 19,
        mouseEnter: false,
        top: null,
        elemInfo: {
            title:'',
            photo: ''
        },
        loading: false
    };
        
    

    componentDidMount(){
        window.addEventListener('resize', this.windowResize);
        this.windowResize();
        this.getDataDB();
    }

    windowResize = () => {
        this.setState({top: this.refs.divprincipalRef.offsetTop});  
    }

    getDataDB = () => {
        const { page } = this.state;
        const posts=[];
        this.setState({loading: true});
        axios.get(`${this.props.url}${page}`)
            .then(response => {
                const datos = response.data.results;
                for( let key in datos){
                    posts.push({
                        key: datos[key].id,
                        id: datos[key].id,
                        title: datos[key].title,
                        description: datos[key].overview,
                        date: datos[key].release_date,
                        vote: datos[key].vote_average,
                        poster: datos[key].poster_path,
                        backdrop: datos[key].backdrop_path
                    });
                }
                this.setState({dataDBList: [...this.state.dataDBList, ...posts]});
                setTimeout(() =>{ this.setState({
                    loading: false}); 
                    if(this.state.mouseEnter === true) this.moveImagesRight();
                }, 500);
                
          })
          .catch( error => {
              console.log(error)
          });
    }
    
    ArrowKeysScrolling = (e) => {
        if( this.state.loading === true || this.state.mouseEnter === true) {
            e.preventDefault();
            return;
        }
        let scrollLeft = this.refs.divprincipalRef.scrollLeft;
        let scrollWidth = this.refs.divprincipalRef.scrollLeftMax - 80;
        isNaN(scrollWidth) ? scrollWidth = this.refs.divprincipalRef.scrollWidth - this.refs.divprincipalRef.clientWidth : null;
    
        if(scrollLeft >= scrollWidth){
            this.setState(prevState => ({page: prevState.page + 1, number: prevState.number + 20}));
            this.getDataDB();
        }
    }

    moveImagesRight = () => {
        if( this.state.loading === true) return;

        this.setState(state => ({mouseEnter: state.mouseEnter=true}));
        let scrollLeft = this.refs.divprincipalRef.scrollLeft;
        let scrollWidth = this.refs.divprincipalRef.scrollLeftMax - 80;
        isNaN(scrollWidth) ? scrollWidth = this.refs.divprincipalRef.scrollWidth - this.refs.divprincipalRef.clientWidth : null;
        this.refs.divprincipalRef.scrollLeft = scrollLeft + 10;
        this.setState({animation: requestAnimationFrame(this.moveImagesRight)});

        if(scrollLeft >= scrollWidth){
            cancelAnimationFrame(this.state.animation);
            this.setState(prevState => ({page: prevState.page + 1, number: prevState.number + 20}));
            this.getDataDB();
        }
    }

    moveImagesLeft = () => {
        if( this.state.loading === true) return;
        
        let scrollLeft = this.refs.divprincipalRef.scrollLeft;
        
        this.setState(state => ({mouseEnter: state.mouseEnter=true}));
        this.refs.divprincipalRef.scrollLeft = scrollLeft - 10;
        this.setState({animation: requestAnimationFrame(this.moveImagesLeft)});

        if(scrollLeft <= 0){
            cancelAnimationFrame(this.state.animation);
        }
    }

    stopMoveImages = () => {
        this.setState({mouseEnter: false});
        cancelAnimationFrame(this.state.animation);
    }
    
    elemInfo = (e) => {
        this.props.sendTargetData(this.state.dataDBList[e.target.attributes[0].nodeValue]);
    }

    

    render(){
        let parrafoStyle = {
            background: '#0d0d0d'
        }
        if(this.props.id === 2){
            parrafoStyle = {
                background: 'transparent'
            }
        }
        let divPrincipalStyle = {
            width: `${window.innerWidth}px`
        }
        var imgStyle = {
            Width: '230px',
            height: '130px'
        }
        var imgType= 'backdrop';
        let titleDivStyle = null;
        
        if(window.innerWidth <= 1000){
            imgType= 'poster';
            imgStyle = {
                width: '130px',
                height: '200px'
            }
        }
        if(window.innerWidth <= 500){
            imgStyle = {
                width: '100%',
                height: '100%'
            }
        }
        if(window.innerWidth > 1600){
            imgStyle = {
                width: `${(window.innerWidth * 15) / 100}px`,
                height: `${(((window.innerWidth * 15) / 100) * 56.52) / 100}px` 
            }
            titleDivStyle = {
                width: `${(window.innerWidth * 15) / 100 - 5}px`,
                fontSize: '18px'
            }
        }
        if(window.innerWidth > 2500){
            titleDivStyle = {
                width: `${(window.innerWidth * 15) / 100 - 5}px`,
                fontSize: '22px',
                height: '30px'
            }
        }
        if(window.innerWidth > 3200){
            titleDivStyle = {
                width: `${(window.innerWidth * 15) / 100 - 5}px`,
                fontSize: '28px',
                height: '35px'
            }
        }
        if(this.props.portada){
            imgType= 'poster';
            imgStyle = {
                width: '110px',
                height: '100%'
            }
            titleDivStyle = {
                display: "none"
            }
            if(window.innerWidth > 1200){
                imgStyle = {
                    width: '130px',
                    height: '100%'
                }
            }
            if(window.innerWidth > 1800){
                imgStyle = {
                    width: '190px',
                    height: '100%'
                }
            }
            if(window.innerWidth > 2800){
                imgStyle = {
                    width: '300px',
                    height: '100%'
                }
            }
            if(window.innerWidth > 3500){
                imgStyle = {
                    width: '350px',
                    height: '100%'
                }
            }
        }
        
        
        let movies=null;
        if(this.state.dataDBList){
            movies= (
                this.state.dataDBList.map((elem, index)=> (
                    <div key={index}>
                        <div className={classes.imgDiv}>
                            <NavigationItem link={`/elementInfo/${elem.id}`} exact>
                                <img
                                    key={index}
                                    id={index}
                                    style={imgStyle}
                                    src={("https://image.tmdb.org/t/p/w300"+elem[imgType])}
                                    alt=''
                                    ref={'ref'+index}
                                    className={classes.image}
                                    onClick= {(e) => this.elemInfo(e)}>
                                </img>
                            </NavigationItem>
                        </div>
                        <div style={titleDivStyle} className={classes.title}>{elem.title}</div>
                    </div>
                    
                ))
            )
        }

    
       
        var botonStyleLeft = {
            left: `${window.innerWidth - 60}px`
        }
        let leftStyleButton = (
            <div 
                style={botonStyleLeft} 
                onMouseEnter={this.moveImagesRight} 
                onMouseLeave={this.stopMoveImages} 
                width="20px" 
                className={classes.boton}>
                <svg height='80' className={[classes.svg, classes.B].join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M192 128l128 128-128 128z"/>
                </svg>
            </div>
        );

        var botonStyRight = {
            left: `0px`
        }
        let rightStyleButton = (
            <div 
                style={botonStyRight}
                className={classes.boton}>
                <svg onMouseEnter={this.moveImagesLeft} onMouseLeave={this.stopMoveImages} height='80' className={[classes.svg, classes.A].join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 128L192 256l128 128z"/>
                </svg>
            </div>
        );


        let spinnerStyle = {
            left: `${(window.innerWidth / 2) - 32}px`
        }
        let html=null;
        this.state.loading ? html = (<Spinner innerWidth={window.innerWidth}/>) : null;

        
        return (
            <div> 
                
                <div className={classes.parrafo} style={parrafoStyle}><p>{this.props.title} ></p></div>
                <div className={classes.divprincipal} style={divPrincipalStyle} ref={'divprincipalRef'} onScroll={(e) => this.ArrowKeysScrolling(e)} onTouchMove={this.ArrowKeysScrolling}>  
                    {rightStyleButton}
                    {leftStyleButton}
                    
                    <div className={classes.list} ref={'divref'}>
                        {movies}      
                    </div>
                    
                </div>
                <div className={classes.spinner} style={spinnerStyle}>{html}</div>
                <div className={classes.ScrollHidde}></div>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        sendTargetData: (datos) => dispatch(actions.target(datos))
    }
}
export default connect(null, mapDispatchToProps)(ListCreator);