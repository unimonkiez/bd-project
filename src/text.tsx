
import * as React from 'react';


interface ITextProps {
  value: string,
}

class Text extends React.Component <ITextProps> {
  public render() {
    const {
      value,
    } = this.props;

    return (
      <React.Fragment>
        {value.split('\n').map(item => (
          <div>
            {item}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Text;
