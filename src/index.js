/* @jsx createElement */

import { createElement, render, Component } from './react.js';

class SubTitle extends Component {
  render() {
    return <h3>부제목</h3>;
  }
}

function Title(props) {
  return (
    <div>
      <h2>제목</h2>
      <SubTitle />
      <p>내용</p>
    </div>
  );
}

render(<Title />, document.querySelector('#root'));
