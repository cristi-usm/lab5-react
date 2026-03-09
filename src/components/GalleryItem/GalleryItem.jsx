import "./GalleryItem.css"

export const GalleryItem = ({drawing, onLoad, onDelete}) => {


    return (
        <>
        <div className="thumbnail">
            {drawing.grid.map((row, rowIndex) => (
                <div key={rowIndex} className="thumbnail-row">
                    {row.map((color, colIndex) => (
                        <div 
                            key={`${rowIndex}-${colIndex}`}
                            className="thumbnail-cell"
                            style={{backgroundColor: color || "white"}}
                        />
                    ))}
                </div>
            ))}
        </div>
        <div className="gallery-item-buttons">
            <button onClick={()=>onLoad(drawing)}>Load</button>
            <button onClick={() => onDelete(drawing.id)}>Delete</button>
        </div>
        </>
        
    )
}