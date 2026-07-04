import { BrowserRouter, Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>ClipCraft</h1>
      <p>AI短剧漫剧工具</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
