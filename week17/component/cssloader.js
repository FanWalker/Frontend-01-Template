const css = require('css');

module.exports = function(source, map) {
  let stylesheet = css.parse(source);

  let name = this.resourcePath.match(/([^\\]+).css$/)[1];
  console.log('------------------', name);

  for (let rule of stylesheet.stylesheet.rules) {
    rule.selectors = rule.selectors.map(slector =>
      slector.match(new RegExp(`^.${name}`)) ? slector : `.${name} ${slector}`
    );
  }
  return `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))};
    document.documentElement.appendChild(style);
  `;
}