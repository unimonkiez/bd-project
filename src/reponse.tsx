import * as React from 'react';

import PokemonDialog from './pokemon-dialog';

import './response.css';

import confettiParticlesSrc from './assets/confetti-particles.png';
import confettiSrc from './assets/confetti.png';


interface IResponseProps {
  max?: boolean,
}

class Response extends React.Component <IResponseProps> {
  public render() {
    const {
    } = this.props;

    return (
      <React.Fragment>
        <div className="confetti">
          <div className="cons">
            {Array.from({ length: 3 }).map(() => (<img src={confettiSrc} />))}
          </div>
          <div className="particles">
            {Array.from({ length: 12 }).map(() => (<img src={confettiParticlesSrc} />))}
          </div>
        </div>
        <PokemonDialog>
          text
        </PokemonDialog>
      </React.Fragment>
    );
  }
}

export default Response;
