const pieces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Fisher Yates shuffle function
const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j]
      array[j] = temp;
  }
};

shuffle(pieces);

function App() {

  return (
   <>
    <h1>Sliding puzzle</h1>
    <div id="puzzle">
      {
        pieces.map((piece, index) => {
          return <div key={piece} className="piece">{piece}</div>
        })
      }
    </div>
   </>
  )
}

export default App;
