import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    margin: 8px;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 10px;
`

export const AppLayout: React.FC = () => {
  return (
    <Container>
      <h1>Design Demo Tool</h1>
      <Nav>
        <Link to="/webgl">WebGL</Link>
        <Link to="/pixi">Pixi</Link>
      </Nav>
      <Outlet />
    </Container>
  )
}
