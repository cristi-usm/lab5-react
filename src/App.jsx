import React, {useState} from "react";
import './App.css'
import colorData from '/data/colors.json'

function App(){

    const n = 20;

    const[grid, setGrid] = useState(Array(n*n).fill("#ffffff"));
    const[selectedColor, setSelectedColor] = useState(colorData[0]);
    const[isMouseDown, setIsMouseDown] = useState(false);

    const colorCell = (index) => {
        if(!selectedColor) return;

        const newGrid = [...grid];
        newGrid[index] = selectedColor;
        setGrid(newGrid)
    }

    const resetGrid = () => {
        setGrid(Array (n * n).fill("#ffffff"))
    }

    const [gallery, setGallery] = useState([]);

    const saveDrawing = () => {
        setGallery([...gallery, [...grid]]);
    };

    const loadDrawing = (savedGrid) => {
        setGrid([...savedGrid]);
    };

    const deleteDrawing = (indexToDelete) => {
        setGallery(gallery.filter((_, index) => index !== indexToDelete));
    };

    return(
        <>
            <div>
                <h1>Pixel Art</h1>

                <p>Paleta de culori</p>
                <div className="palette">
                    {colorData.map(color => (
                        <div key={color} className={`swatch ${selectedColor === color ? 'active' : ''}`}
                             style={{backgroundColor : color}} onClick={() => setSelectedColor(color)}></div>
                    ))}
                </div>
                <button className="reset-btn" onClick={resetGrid}>reset</button>

                <div className="grid" style={{gridTemplateColumns : `repeat(${n}, 20px)`}}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
                onMouseLeave={() => {setIsMouseDown(false)}}>
                    {grid.map((cellColor, index) => (
                        <div key={index} className="cell" style={{backgroundColor : cellColor}} onMouseDown={() => colorCell(index)}
                        onMouseEnter={() => {if(isMouseDown)  colorCell(index)}}/>
                    ))}
                </div>

            </div>

            <div className="gallery-section">
                <h2>Galerie ({gallery.length} desene)</h2>
                <button className="save-btn" onClick={saveDrawing}>Salvează desenul</button>

                <div className="gallery-list">
                    {gallery.map((savedGrid, index) => (
                        <div key={index} className="thumbnail-container">
                            {/* Miniatura desenului */}
                            <div
                                className="thumbnail"
                                onClick={() => loadDrawing(savedGrid)}
                                style={{ gridTemplateColumns: `repeat(${n}, 5px)` }}
                            >
                                {savedGrid.map((color, idx) => (
                                    <div key={idx} style={{ backgroundColor: color, width: '5px', height: '5px' }} />
                                ))}
                            </div>

                            <div className="thumbnail-controls">
                                <button onClick={() => loadDrawing(savedGrid)}>Load</button>
                                <button className="delete-btn" onClick={() => deleteDrawing(index)}>Sterge</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default App