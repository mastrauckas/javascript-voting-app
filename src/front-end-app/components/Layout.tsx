// components/Layout.js
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import styled from 'styled-components'

const FlexWrapperSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const FlexMain = styled(Main)`
  flex: 1;
`

export default function Layout() {
  return (
    <FlexWrapperSection>
      <Header />
      <FlexMain />
      <Footer />
    </FlexWrapperSection>
  )
}
