/* @jsx createElement */
import { createElement, render, Component } from './react.js';

class SubTitle extends Component {
  render() {
    return createElement("h3", null, "\uBD80\uC81C\uBAA9");
  }

}

function Title(props) {
  return createElement("div", null, createElement("h2", null, "\uC81C\uBAA9"), createElement(SubTitle, null), createElement("p", null, "\uB0B4\uC6A9"));
}

render(createElement(Title, null), document.querySelector('#root'));