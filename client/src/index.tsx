import { h, render, FunctionalComponent } from "preact";

const HelloWorld: FunctionalComponent<{name: string}> = (props) => {
  const name = props.name
  return (
    <div>
      <h1>Hello World</h1>
      <p>{name}</p>
    </div>
  );
};

render(<HelloWorld name="wtf" />, document.querySelector("#app"));

/*
if (module.hot) {
  module.hot.accept("./App.tsx", () => {
    const AppHMR = require("./App"); // eslint-disable-line global-require, @typescript-eslint/no-var-requires
    render(<AppHMR.default />, document.querySelector("#root"));
  });
}
*/