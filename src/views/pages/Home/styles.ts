import styled from 'styled-components';

export const HomeContent = styled.div`
  & #main{
    min-height:969px;
    justify-content: center;
    background: rgb(58,217,223);
    background: linear-gradient(155deg, rgba(58,217,223,1) 0%, rgba(92,173,176,1) 100%);
    align-items: center;
    text-align: center;
  }

  & .container{
    display: flex;
    justify-content: space-around;
    padding-top: 15px;
    width: 99%;
    height: 97vh;
    margin: 0 auto;
    
  }

  & .content{
    display: flex;
    border-radius: 5px;
    width: 82.5%;
    margin:0 0 0 15px;
    font-weight: bold;
  }

  @media(max-width: 960px){
    & #main{
      height: 2000px;
    }

    & .container{
    padding-top: 0;
    display: block;
    width: 100%;
    margin: 0 auto;
    
  }

    & .content{
      width: 100%;
      margin: 0;
      padding: 0;
      flex-direction: row;
      justify-content: space-between;
      background: none;
    }
  }
`