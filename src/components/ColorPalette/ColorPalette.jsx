
import "./ColorPalette.css"
export const ColorPalette = ({colors, selectedColor, onSelecterColor}) => {


    return (
        <div className="color-palette">
            {colors.map(cl => (
                <div
                key={cl.id}
                style={{backgroundColor: cl.hex}}
                className={`color-swatch ${cl.hex === selectedColor ? "active" : ""}`}
                onClick={() => onSelecterColor(cl.hex)}
                ></div>
            ))}
        </div>
        
    )
}