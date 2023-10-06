import './App.css'
import {ScrollingAd, FlyJourney, JumpingModel} from "./views"
import {Link,Routes,Route} from "react-router-dom"
function App() {

  return (
    <div className="app">
      <nav className="nav">
        <h4>JGDEV3dSnippets</h4>
    <ul className="nav-links">
      <li className="nav-item">
        <Link to="/scrolling">ScrollingAd</Link>
      </li>
      <li className="nav-item">
        <Link to="/flyjourney">Flight Journey</Link>
      </li>
      <li className="nav-item">
        <Link to="/jumpingmodel">Custom Model</Link>
      </li>
    </ul>
      </nav>
      <Routes>
        <Route path="/scrolling" element={<ScrollingAd/>}/>
        <Route path="/flyjourney" element={<FlyJourney/>}/>
        <Route path="/jumpingmodel" element={<JumpingModel/>}/>
      </Routes>
   
    </div>
  )
}

export default App
