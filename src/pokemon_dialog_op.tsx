import * as React from 'react';
import './App.css';
interface IPokemonDialogOptionProps {
  onPress?: () => void,
}
class PokemonDialogOption  extends React.Component <IPokemonDialogOptionProps> {
  public render() {
    return (
      
        <div className="pokemon_dialog option" onClick={this.props.onPress  as any}>
          {this.props.children}
        
        </div>
        
    );
  }
}

export default PokemonDialogOption;
