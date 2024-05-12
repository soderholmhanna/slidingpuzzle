import Game from "./components/Game";

function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Game blocks={numbers}/>
  )
}

export default App;
