import api from '../../services/api';
import React, {Component} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import '../../pages/pizarra/styles.css';


export default class CotizacionCompraVenta extends Component{
    state = {
        cotizaciones: [],
        compraVenta: [],
        prueba: 0
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
        var prueba = 0;
        if(prueba === 0){
            setTimeout(
                ()=>(
                    this.setState({prueba: 1}),
                    setTimeout(
                        ()=>(
                            this.setState({prueba: 0})
                        ),
                        6000
                    )
                ),
                2000
            );
        }

        return(
            <div>
                <div className="containerCotizacionCompraVenta">
                    <div className="containerTitle">
                        <p className="titleItemCompra title">Compra</p>
                        <p className="titleItemVenta title">Venta</p>
                    </div>
                        {compraVenta.map(moneda => (
                            <AnimatePresence>
                                {(prueba) && (
                                    <motion.div
                                        initial={{x: -200, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        exit={{opacity: 0, x: 200}}
                                    >
                                        <div className="containerCotizacion" key={`moneda${moneda.orden}`}>
                                            <img src={`img/${moneda.monImg}`} alt={`Imagen ${moneda.orden}`}/>
                                            <p className="cotizacion">{moneda.monISO}</p>
                                            <p className="cotizacion">{moneda.monISOnom}</p>
                                            <p className="cotizacion">{moneda.cpa}</p>
                                            <p className="cotizacion">{moneda.vta}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ))}
                </div>
            </div>
        );
    }
}