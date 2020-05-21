import api from '../../services/api';
import React, {Component} from 'react';
import {motion} from 'framer-motion';
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
        var {compraVenta} = this.state;

        const container = {
            hidden: {
                x: -500,
                opacity: 0
            },
            visible: {
                x: 0, 
                opacity: 1,
                transition: {
                    staggerChildren: 5,
                }
            }
        };

        const monedaitem = {
            hidden: {x: -500, opacity: 0},
            visible:{
                x: 0,
                opacity: 1
            }
        }

        return(
            <div>
                <div className="containerCotizacionCompraVenta">
                    <div className="containerTitle">
                        <p className="titleItemCompra title">Compra</p>
                        <p className="titleItemVenta title">Venta</p>
                    </div>
                    <motion.div variants={container} initial="hidden" animate="visible">
                        {compraVenta.map(moneda => (
                            <motion.div variants={monedaitem}>
                                <div className="containerCotizacion" key={`moneda${moneda.orden}`}>
                                    <img src={`img/${moneda.monImg}`} alt={`Imagen ${moneda.orden}`}/>
                                    <p className="cotizacion">{moneda.monISO}</p>
                                    <p className="cotizacion">{moneda.monISOnom}</p>
                                    <p className="cotizacion">{moneda.cpa}</p>
                                    <p className="cotizacion">{moneda.vta}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        );
    }
}