import styled, { css, keyframes } from 'styled-components';

interface MenuProps {
  isActive: boolean;
}

interface DesktopMenuProps {
  currentPage: string | undefined;
}

export const Container = styled.div`
  width: 100vw;
`;

export const Header = styled.header`
  padding: 1em;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    display: none;
  }

  @media (min-width: 1024px) {
    display: flex;

    > img {
      display: inline;
      align-self: center;
      height: 70px;
    }
  }
`;

export const SignOut = styled.button`
  margin-left: auto;
  background: transparent;
  border: 0;

  svg {
    transition: color 0.225s;

    color: #999591;
    width: 20px;
    height: 20px;
  }

  &:hover {
    svg {
      color: #c53030;
    }
  }

  @media (min-width: 1024px) {
    margin-right: 2em;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.6em 0 1em;

  div {
    display: flex;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-decoration: none;
      color: #ba382f;

      strong {
        color: #ba382f;
      }

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media (min-width: 1024px) {
    div {
      a {
        font-size: 1.4em;

        svg {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
`;

const dropdown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const MobileMenu = styled.div<MenuProps>`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    z-index: 90;
    align-items: center;
    background: #28262e;

    > button {
      background: transparent;
      border: 0;

      svg {
        margin-right: 0.4em;
        width: 30px;
        height: 30px;
      }

      ${props =>
        props.isActive
          ? css`
              svg {
                color: #c53030;
              }
            `
          : css`
              svg {
                color: #999591;
              }
            `}
    }

    a {
      display: none;
      font-family: 'Bebas Neue', cursive;
      text-decoration: none;
      color: #f4ede8;
      border-bottom: 1px hidden #ba382f;
      margin: 0.8em 0em;
      font-size: 1.2em;

      transition: color 0.4s;

      &:hover {
        color: #ba382f;
        border-bottom: 1px solid #ba382f;
      }
    }
  }

  ${props =>
    props.isActive &&
    css`
      div {
        a {
          animation: ${dropdown} 1s;
          display: inline;
        }
      }
    `}

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobilePageHeader = styled.strong`
  display: inline;

  font-size: 1em;
  color: #bab9b8;
  border-bottom: 1px solid #ba382f;

  margin-left: 1em;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const DesktopMenu = styled.div<DesktopMenuProps>`
  display: none;

  @media (min-width: 1024px) {
    display: flex;

    a {
      font-family: 'Bebas Neue', cursive;
      font-size: 2em;
      line-height: 24px;
      text-decoration: none;
      color: #f4ede8;
      border-bottom: 1px hidden #ba382f;

      margin: 0 1em;

      transition: color 0.4s;

      &:hover {
        color: #ba382f;
        border-bottom: 1px solid #ba382f;
      }
    }

    ${props =>
      props.currentPage &&
      props.currentPage === 'leads' &&
      css`
        #leads {
          color: #bab9b8;
          border-bottom: 1px solid #ba382f;

          &:hover {
            color: #ba382f;
            border-bottom: 1px solid #ba382f;
          }
        }
      `}

      ${props =>
        props.currentPage &&
        props.currentPage === 'home' &&
        css`
          #home {
            color: #bab9b8;
            border-bottom: 1px solid #ba382f;

            &:hover {
              color: #ba382f;
              border-bottom: 1px solid #ba382f;
            }
          }
        `}

      ${props =>
        props.currentPage &&
        props.currentPage === 'recover' &&
        css`
          #recover {
            color: #bab9b8;
            border-bottom: 1px solid #ba382f;

            &:hover {
              color: #ba382f;
              border-bottom: 1px solid #ba382f;
            }
          }
        `}

        ${props =>
          props.currentPage &&
          props.currentPage === 'register' &&
          css`
            #leads {
              color: #bab9b8;
              border-bottom: 1px solid #ba382f;

              &:hover {
                color: #ba382f;
                border-bottom: 1px solid #ba382f;
              }
            }
          `}
  }
`;
