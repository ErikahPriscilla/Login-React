import React from 'react';

export default class Label extends React.Component{
  render(){
    return(
      <>
        {this.props.texto}
      </>
    );
  }
}