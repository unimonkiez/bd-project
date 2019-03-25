import * as React from 'react';
import './App.css';
interface IPokemonDialogProps {
  onPress?: () => void,
}
class PokemonDialog  extends React.Component <IPokemonDialogProps> {
  public render() {
    return (
      
        <div className="pokemon_dialog" onClick={this.props.onPress  as any}>
          <i/>
          {this.props.children}
        </div>
        
    );
  }
}

export default PokemonDialog;
