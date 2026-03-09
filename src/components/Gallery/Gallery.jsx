
import {GalleryItem} from "../GalleryItem/GalleryItem"
import "./Gallery.css"
export const Gallery = ({savedDrawings, onLoad, onDelete}) => {


    return (
        <div className="gallery">

           
            {savedDrawings.map(sd => (
                <GalleryItem 
                    key={sd.id}
                    drawing={sd}
                    onLoad={onLoad}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
} 