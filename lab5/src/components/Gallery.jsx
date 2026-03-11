export default function Gallery({ gallery, onLoad, onDelete }) {

  if (gallery.length === 0) {
    return <p className="empty-gallery">No drawings saved</p>
  }

  return (
    <div className="gallery">

      {gallery.map((drawing) => (

        <div key={drawing.id} className="gallery-item">

          <div
            className="thumbnail"
            onClick={() => onLoad(drawing.id)}
          >

            <div
              className="thumbnail-grid"
              style={{
                gridTemplateColumns: `repeat(${drawing.pixels.length}, 1fr)`,
                gridTemplateRows: `repeat(${drawing.pixels.length}, 1fr)`
              }}
            >

              {drawing.pixels.flat().map((color, index) => (

                <div
                  key={index}
                  className="thumbnail-cell"
                  style={{ backgroundColor: color }}
                />

              ))}

            </div>

          </div>

          <div className="gallery-actions">

            <button
              className="action-button load-button"
              onClick={() => onLoad(drawing.id)}
            >
              Load
            </button>

            <button
              className="action-button delete-button"
              onClick={() => onDelete(drawing.id)}
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  )
}