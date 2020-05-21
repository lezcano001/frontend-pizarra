import api from '../../services/api';
import React, {Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import '../../pages/pizarra/styles.css';


export default class CotizacionCompraVenta extends Component{
    state = {
        cotizaciones: [],
        compraVenta: []
    }

    componentDidMount(){
        setInterval(this.loadCotizaciones, 3000);
    }


    loadCotizaciones = async () => {
        const response = await api.get('/monedas');

        this.setState({cotizaciones: response.data});
        
        this.ordenCompraVenta();

    }


    ordenCompraVenta(){
        var compraVenta = [0, 0, 0, 0];
        this.state.cotizaciones.map(moneda=> {
                if(moneda.orden === 1){
                    compraVenta[0] = moneda;
                }
                if(moneda.orden === 2){
                    compraVenta[1] = moneda;
                }
                if(moneda.orden === 3){
                    compraVenta[2] = moneda;
                }
                if(moneda.orden === 4){
                    compraVenta[3] = moneda;
                }
                return 0;
            }
        )
        this.setState({compraVenta: compraVenta});
    }

    render(){
        var moneda1 = "";
        var moneda2 = "";
        var moneda3 = "";
        var moneda4 = "";
        var {compraVenta} = this.state;            
        if(compraVenta.length > 0){
            moneda1 = (
            <Spring from={{opacity: 0, marginLeft: -500}} to={{opacity: 1, marginLeft: 0}} config={{delay:1000}}>
                {props => (
                    <div style={props}>
                        <Spring from={{opacity: 1}} to={{opacity: 0}} config={{delay: 10000}}>
                            {props => (
                                <div style={props}>
                                    <div className="containerCotizacion" key={`moneda${compraVenta[0].orden}`}>
                                        <img src={`img/${compraVenta[0].monImg}`} alt={`Imagen ${compraVenta[0].orden}`}/>
                                        <p className="cotizacion">{compraVenta[0].monISO}</p>
                                        <p className="cotizacion">{compraVenta[0].monISOnom}</p>
                                        <p className="cotizacion">{compraVenta[0].cpa}</p>
                                        <p className="cotizacion">{compraVenta[0].vta}</p>
                                    </div>
                                </div>
                            )}
                        </Spring>                      
                    </div>
                )}
            </Spring>)

            if(compraVenta.length > 1){
                moneda2 = (
                <Spring from={{opacity: 0, marginLeft: -500}} to={{opacity: 1, marginLeft: 0}} config={{delay: 2000}}>
                    {props => (
                        <div style={props}>
                            <Spring from={{opacity: 1}} to={{opacity: 0}} config={{delay: 10250}}>
                                {props => (
                                    <div style={props}>
                                        <div className="containerCotizacion" key={`moneda${compraVenta[1].orden}`}>
                                            <img src={`img/${compraVenta[1].monImg}`} alt={`Imagen ${compraVenta[1].orden}`}/>
                                            <p className="cotizacion">{compraVenta[1].monISO}</p>
                                            <p className="cotizacion">{compraVenta[1].monISOnom}</p>
                                            <p className="cotizacion">{compraVenta[1].cpa}</p>
                                            <p className="cotizacion">{compraVenta[1].vta}</p>
                                        </div>
                                    </div>
                                )}
                            </Spring>                      
                        </div>
                    )}
                </Spring>)
            }
            if(compraVenta.length > 2){
                moneda3 = (
                <Spring from={{opacity: 0, marginLeft: -500}} to={{opacity: 1, marginLeft: 0}} config={{delay: 3000}}>
                    {props => (
                        <div style={props}>
                            <Spring from={{opacity: 1}} to={{opacity: 0}} config={{delay: 10500}}>
                                {props => (
                                    <div style={props}>
                                        <div className="containerCotizacion" key={`moneda${compraVenta[2].orden}`}>
                                            <img src={`img/${compraVenta[2].monImg}`} alt={`Imagen ${compraVenta[2].orden}`}/>
                                            <p className="cotizacion">{compraVenta[2].monISO}</p>
                                            <p className="cotizacion">{compraVenta[2].monISOnom}</p>
                                            <p className="cotizacion">{compraVenta[2].cpa}</p>
                                            <p className="cotizacion">{compraVenta[2].vta}</p>
                                        </div>
                                    </div>
                                )}
                            </Spring>                      
                        </div>
                    )}
                </Spring>)
            }
            if(compraVenta.length > 3){
                moneda4 = (
                <Spring from={{opacity: 0, marginLeft: -500}} to={{opacity: 1, marginLeft: 0}} config={{delay:4000}}>
                    {props => (
                        <div style={props}>
                            <Spring from={{opacity: 1}} to={{opacity: 0}} config={{delay: 10750}}>
                                {props => (
                                    <div style={props}>
                                        <div className="containerCotizacion" key={`moneda${compraVenta[3].orden}`}>
                                            <img src={`img/${compraVenta[3].monImg}`} alt={`Imagen ${compraVenta[3].orden}`}/>
                                            <p className="cotizacion">{compraVenta[3].monISO}</p>
                                            <p className="cotizacion">{compraVenta[3].monISOnom}</p>
                                            <p className="cotizacion">{compraVenta[3].cpa}</p>
                                            <p className="cotizacion">{compraVenta[3].vta}</p>
                                        </div>
                                    </div>
                                )}
                            </Spring>                      
                        </div>
                    )}
                </Spring>)
            }            
        }
        return(
            <div>
                <div className="containerCotizacionCompraVenta">
                    <div className="containerTitle">
                        <p className="titleItemCompra title">Compra</p>
                        <p className="titleItemVenta title">Venta</p>
                    </div>                                    
                    {moneda1}
                    {moneda2}
                    {moneda3}
                    {moneda4}
                </div>
            </div>
        );
    }
}