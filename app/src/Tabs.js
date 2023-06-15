import React from 'react';

import { useState } from "react";
import "./App.css";
import {TabelaArmazens} from './components/armazem';
import TabelaCamioes from './components/camiao';
import TabelaRotas from './components/rota';
import Camionistas from './components/camionista';
import Mapa from './components/mapa';
import AssociarCamionista from './components/asscam';

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Armazéns
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Camiões
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Camionistas
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Rotas
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <TabelaArmazens />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <TabelaCamioes />
      
          
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
         
          <Camionistas />   
          <AssociarCamionista/>  
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
        
      
          <TabelaRotas/>
          
          <Mapa/>
          
        </div>
      </div>
    </div>
  );
}

export default Tabs;
