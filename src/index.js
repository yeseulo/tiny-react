/* @jsx createElement */
import { createElement, render } from './react.js';

function Title() {
  return (
    <div>
      <h2>제목</h2>
      <p>내용</p>
    </div>
  );
}

render(<Title />, document.querySelector('#root'));