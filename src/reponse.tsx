import * as React from 'react';

import PokemonDialog from './pokemon-dialog';
import Text from './text';

import './response.css';

import confettiParticlesSrc from './assets/confetti-particles.png';
import confettiSrc from './assets/confetti.png';


interface IResponseProps {
  isBoy: boolean,
  name: string,
  nemsisName: string,
}

class Response extends React.Component <IResponseProps> {
  public render() {
    const {
      isBoy,
      name,
      nemsisName,
    } = this.props;

    const text = `עכשיו ${isBoy ? 'אתה' : 'את'} ${isBoy ? 'מוכן' : 'מוכנה'} לצאת לעולם!
    שמח שבאת ליום הולדתי ${name},
    אני מקווה שיום אחד ${isBoy ? 'תביס' : 'תביסי'} את ${nemsisName}!`

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
          <Text value={text} />
        </PokemonDialog>
      </React.Fragment>
    );
  }
}

export default Response;
