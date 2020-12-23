# ReactX
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