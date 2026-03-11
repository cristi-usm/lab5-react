export default function Gallery({ gallery, loadDrawing, deleteDrawing }) {

  return (
    <div className="gallerySection">

      <h3>SAVED DRAWINGS ({gallery.length})</h3>

      {gallery.map((drawing, index) => (
        <div key={index} className="drawingCard">

          <div className="thumbnail">

            {drawing.map((color, i) => (
              <div
                key={i}
                className="miniCell"
                style={{ backgroundColor: color }}
              ></div>
            ))}

          </div>

          <div className="galleryButtons">
            <button onClick={() => loadDrawing(drawing)}>Load</button>
            <button onClick={() => deleteDrawing(index)}>Delete</button>
          </div>

        </div>
      ))}

    </div>
  )
}