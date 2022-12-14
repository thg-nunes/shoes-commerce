import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* essa estilização na media-screen diminui a font de 16px(padrão) para 15px e 14px respectivamente */
  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  /* essa estilização é feita pelo fato de cada um desses elementos "não respeitaram" a font definida na aplicação,
    então "obrigo" cada um a usar a font escolhida
  */
  body, input, textarea, select, button {
    font: 400 1rem 'Poppins', sans-serif;
  }

  body {
    overflow-x: hidden;
    color: ${({ theme }) => theme.colors.white[100]};
    background: ${({ theme }) => theme.colors.gray[800]};
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .Toastify__toast {
    color: ${({ theme }) => theme.colors.white[100]};
    background-color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

export { GlobalStyles };
