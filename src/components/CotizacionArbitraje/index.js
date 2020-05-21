import api from '../../services/api';
import React, {Component} from 'react';
import {Transition} from 'react-spring/renderprops';

import '../../pages/pizarra/styles.css';

export default class CotizacionArbitraje extends Component{
    state = {
        cotizaciones: [],
        arbitraje: []
    }

    componentDidMount(){
        setInterval(this.loadCotizaciones, 3000);
    }

    loadCotizaciones = async () => {
        const response = await api.get('/monedas');

        this.setState({cotizaciones: response.data});
        
        this.ordenArbitraje();
    }

    ordenArbitraje(){
        var arbitraje = [0, 0, 0]

        this.state.cotizaciones.map(moneda=> {
                if(moneda.orden === 5){
                    arbitraje[0] = moneda;
                }
                if(moneda.orden === 6){
                    arbitraje[1] = moneda;
                }
                if(moneda.orden === 7){
                    arbitraje[2] = moneda;
                }
                return 0;
            }
        )
        this.setState({arbitraje: arbitraje});
    }

    render(){
        var {arbitraje} = this.state;
        const items = [1,2,3,4,5];
        return(
            <div>
                <div className="containerCotizacionArbitraje">
                    {arbitraje.map(moneda => (
                        <div className="containerCotizacion" key={`moneda${moneda.orden}`}>
                            <li>
                                <img src={`img/${moneda.monImg}`} alt={`Imagen ${moneda.orden}`}/>
                                <img src={`img/${moneda.monCotImg}`} alt={`Imagen ${moneda.orden}`}/>
                            </li>
                            <p></p>
                            <p className="cotizacion">{moneda.monISO}x{moneda.monCot}</p>
                            <p className="cotizacion">{moneda.cpa}</p>
                            <p className="cotizacion">{moneda.vta}</p>
                        </div>
                    ))}
                </div>
                <Transition
                items={arbitraje} keys={item => item.key}
                from={{ transform: 'translate3d(-40px,0,0)' }}
                enter={{ transform: 'translate3d(0,0,0)' }}
                leave={{ transform: 'translate3d(-40px,0,0)' }}>
                {item => props => <div style={props}>
                    <div className="containerCotizacion" key={`moneda${item.orden}`}>
                        <li>
                            <img src={`img/${item.monImg}`} alt={`Imagen ${item.orden}`}/>
                            <img src={`img/${item.monCotImg}`} alt={`Imagen ${item.orden}`}/>
                        </li>
                        <p></p>
                        <p className="cotizacion">{item.monISO}x{item.monCot}</p>
                        <p className="cotizacion">{item.cpa}</p>
                        <p className="cotizacion">{item.vta}</p>
                    </div>
                </div>}
                </Transition>
                <h1>Hola</h1>
            </div>
        )
    }
}