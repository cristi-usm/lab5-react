
import "./PixelCell.css"
export const PixelCell = ({color, onMouseDown, onMouseEnter, onMouseUp})=> {
    
    
    function darkenColor(hex){
        if(!hex) return "#ddd"
        const num = parseInt(hex.slice(1), 16)
        const r = Math.max(0, (num >> 16) - 40)
        const g = Math.max(0, ((num >> 8) & 0xff) - 40)
        const b = Math.max(0, (num & 0xff) - 40)
        return `rgb(${r}, ${g}, ${b})`
    }
    
    return (
        <div 
            className="pixel-cell" 
            style={{backgroundColor: color ||  "white",
                    border: `1px solid ${darkenColor(color) || "#ddd"}` }}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        ></div>
    )
}