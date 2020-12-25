import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    font-size: 62.5%;

    --red: #F7685B;
    --green: #09644b;
    --black: #192A3E;
    --table-black: #323C47;
    --table-gray: #707683;
    --gray: #f2e9fc;
    --icon-gray: #C2CFE0;
    --white: #f1f1f1;
    --divider: #EBEFF2;
    --input-placeholder: #666360;
    --error-red: #c53030;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #312E38;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, footer {
    font-family: 'Roboto', serif;
    font-size: 16px;
  }

  #root {
    margin: 0 auto;
  }

  button {
    cursor: pointer;
  }
`;
