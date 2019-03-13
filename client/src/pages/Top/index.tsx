import { h } from "preact";
import { render } from "preact-render-to-string";

let vdom = <div class="foo">content</div>;
let html = render(vdom);
console.log(html);
// <div class="foo">content</div>
