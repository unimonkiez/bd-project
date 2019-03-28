import * as React from 'react';
import './pokemon-dialog.css';

import pokeSrc from './assets/pokechat.png';

interface IPokemonDialogProps {
  onPress?: () => void,
  max?: boolean,
}

class PokemonDialog extends React.Component <IPokemonDialogProps> {
  public static defaultProps = {
    max: true,
  };

  public render() {
    const {
      onPress,
      max,
      children,
    } = this.props;
    return (
        <div className={`pokemon_dialog${max? ' max' : ''}`} onClick={onPress as any}>
          {onPress && <i/>}
          <img src={pokeSrc} />
          <img src={pokeSrc} />
          <img src={pokeSrc} />
          <img src={pokeSrc} />
          {children}
        </div>
    );
  }
}

export default PokemonDialog;
