import React, {Component} from 'react';
import Header from '../../components/Header/index';
import CotizacionCompraVenta from '../../components/CotizacionCompraVenta/index';
import CotizacionArbitraje from '../../components/CotizacionArbitraje/index';

import './styles.css';
        
export default class Main extends Component{
    render(){
        return (
            <div>
                <Header />
                <div id="container">
                    <div id="containerCompraVenta">
                        <CotizacionCompraVenta />
                    </div>
                    <marquee>Hola como estas</marquee>
                    <div id="containerArbitraje">
                        <CotizacionArbitraje />
                    </div>            
                </div>
            </div>
        )
    }
}