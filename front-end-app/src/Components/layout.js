import React, { Component } from 'react'
import Header from './header'
import Main from './main'
import styled, { createGlobalStyle } from 'styled-components'
import Footer from './footer'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
    font-size: 90%;
  }

  body {
    font-size: 14px;
    font-size: 1.4rem;
  }
`
export default class Layout extends Component {
  render () {
    const FlexWrapperSection = styled.section`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `

    const FlexMain = styled(Main)`
      flex: 1;
    `

    return (
      <FlexWrapperSection>
        <GlobalStyle />
        <Header />
        <FlexMain />
        <Footer />
      </FlexWrapperSection>
    )
  }
}
