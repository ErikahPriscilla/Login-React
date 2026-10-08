import React from 'react';

export default class Labelln extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valor: props.texto,
    };
  }

  render() {
    return (
      <>
        {this.state.valor} <br />
      </>
    );
  }
}
