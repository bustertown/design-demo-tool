import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { WebGl } from './pages/WebGl'
import { Pixi } from './pages/Pixi'
import { AppLayout } from './AppLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route path="/webgl" element={<WebGl />} />
        <Route path="/pixi" element={<Pixi />} />
        <Route path={'*'} element={<WebGl />} />
      </Route>
    </>,
  ),
)

export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
