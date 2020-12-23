# Tiny React
React의 `createElement`와 `render` 메소드를 간단하게 구현해보기

---

## 까다로운 문자열(HTML)을 Object로 바꾸기

DOM을 다루기 쉬운 Object로 변환해서 사용한다.

#### HTML의 Object 표현을 위한 의사코드

```html
<div id="root">
  <span>abcdx</span>
</div>
```

```json
{
  tagName: 'div',
  props: {
    id: 'root',
    className: 'container',
  },
  children: [
    {
      tagName: 'span',
      props: {},
      children: [
        'abcdx',
      ]
    }
  ]
}
```

## React Method 만들기

#### `createElement()`

Babel을 통해 JSX가 변환되는 모습을 참고하여 createElement의 형태를 만든다.

```javascript
function createElement(tagName, props, ...children) {
  return { tagName, props, children };
}
```

#### `render()`
Virtual DOM을 Real DOM으로 표현한다.
```javascript
function createElement(tagName, props, ...children) {
  return { tagName, props, children };
}
```

## `@jsx` 지시어 사용하기

- 스크립트 문서 맨 위 @jsx 주석을 통해 babel 변환 후 사용할 함수 이름을 지정할 수 있다.
- 참고: [WTF is JSX](https://jasonformat.com/wtf-is-jsx/)

```javascript
/* @jsx createElement */

function Title() {
  return createElement("h2", null, "\uD0C0\uC774\uD2C0");
}
```

```
{
  props: null,
  children: Array(0),
  tagName: ƒ
}
children: []
props: null
tagName: ƒ Title()
__proto__: Object
```

## Class Component
- JavaScript에서 클래스와 함수를 구분할 방법이 없어서, 슈퍼 클래스를 가지고 클래스 상속을 받은 함수인지 구분한다.
- 클래스의 instance를 만들어서 props와 children 주입하고 jsx를 반환하는 render 메소드 호출
```jsx
class SubTitle extends Component {
  render() {
    return <h3>...</h3>;
  }
}
```
```javascript
function createElement(tagName, props, ...children) {
  if (typeof tagName === 'function') {
    if (tagName.prototype instanceof Component) {
      const instance = new tagName({ ...props, children });
      return instance.render();
    } else {
      ...
    }
  }
  return { tagName, props, children };
}
```

## Hook의 컨셉
- 함수가 호출될 때 어떻게 마지막 상태를 react가 알고 그 마지막 상태 값을 넘겨줄까?
  - Virtual DOM을 가지고 Real DOM을 렌더링할 때, 호출하는 함수들의 수와 순서는 늘 같으니까 어딘가에 그 수와 순서를 저장해두고(그 상태를 저장해두고) 해당 n번 째 함수가 호출되면 저장된 n번 째 상태를 전달한다는 아이디어.
- 참고: [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)

#### `useState()`
- 초기값을 인자로 받고 배열을 반환: value와 value를 업데이트할 dispatch 함수의 배열
- createElement()에서 return 되기 전, hook이 호출된다. (반드시 함수형 컴포넌트 안에서만)
- useState()와 createElement() 사이에서 정보 공유용, 어떤 함수가 호출되는지 알 수 있도록 바깥 공간에 순서 값을 가지고 있는다: `currentComponent`

```javascript
export function useState(initialValue) {
  const position = currentComponent; // capturing

  // not first call
  if(!hooks[position]) {
    hooks[position] = initialValue;
  }

  return [
    hooks[position],
    (nextValue) => {
      hooks[position] = nextValue;
    },
  ];
}
```