module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components', 'stylelint-config-prettier'],
  rules: {
    'selector-pseudo-element-colon-notation': null,
    'value-keyword-case': null,
    'no-descending-specificity': null,
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    "selector-descendant-combinator-no-non-space": null,
    "indentation": null,
    "selector-combinator-space-before": null
  },
};
