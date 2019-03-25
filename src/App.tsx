import * as React from 'react';
import './App.css';

import oakSrc from './assets/oak.png';
import PokemonDialog from './pokemon_dialog';
import PokemonDialogOption from './pokemon_dialog_op';

interface IState {
  phase?: string;
}


class App extends React.Component <{},IState> {
  public componentWillMount() {
    this.state ={
      phase: "inital"
    };
    this.handlePress = this.handlePress.bind(this);
  }

  public render() { 
    if (this.state.phase==="sex"){
      
    return this.renderSexPhase();
    } else {

      return this.renderInitalPhase();
    }
  }
  private renderSexPhase() {
    return (<div className="app">

      <img src={oakSrc} className="oak_img" />
      <PokemonDialog >
        מה המין שלך?
        <PokemonDialogOption >
        בן
        </PokemonDialogOption>
        <PokemonDialogOption>
        בת
        </PokemonDialogOption>
        </PokemonDialog>
    </div>);
  }

  private renderInitalPhase() {
    return (<div className="app">

      <img src={oakSrc} className="oak_img" />
      <PokemonDialog onPress={this.handlePress}>
        שלום אני יובל, בוא ספר לי על עצמך
      </PokemonDialog>
    </div>);
  }

  private handlePress(): any {
   this.setState({
     phase: "sex"
   });
  }
}

export default App;
