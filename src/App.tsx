import './App.css';
import { useState } from 'react';

type Tpoint = {
  x: number,
  y: number,
}

function App() {
  const [ points, setPoints ] = useState<Tpoint[]>([]);
  const [ redoPoints, setRedoPoints ] = useState<Tpoint[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setPoints([...points, {
      x: clientX,
      y: clientY
    }]);
    console.log(clientX, clientY);
  }

  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    setPoints(newPoints);
    const newRedoPoints = [...redoPoints];
    newRedoPoints.push(poppedPoint!);
    setRedoPoints(newRedoPoints);
    console.log("POINTS: ", points)
    console.log("REDO POINTS: ", redoPoints);
  }

  const handleRedo = () => {
    const newPointsOnRedo = [...points];
    const newRedoPointsOnRedo = [...redoPoints];
    const poppedRedidPoint = newRedoPointsOnRedo.pop();
    newPointsOnRedo.push(poppedRedidPoint!);
    setPoints(newPointsOnRedo);
    console.log("POINTS: ", points)
    console.log("REDO POINTS: ", redoPoints);
  }

  return (
    <>
    <button onClick={()=>handleUndo()}>Undo</button>
    <br></br>
    <br></br>
    <button onClick={()=>handleRedo()}>Redo</button>
    <div className='App' onClick={handleClick}>
      {
        points.map((point, index) =>
          <div className='point' key={index} style={{
            left: point.x - 3,
            top: point.y - 3,
            }}>
          </div>
        )
      }
    </div>
    </>
  );
}

export default App;
