export default function Paleta({ colors, setSelectedColor, selectedColor }) {
    return (
        <>
            <div className="palette">
                {colors.map((color, index) => (
                    <div key={index}
                        className="colorBox"
                        style={{
                            backgroundColor: color,
                            border: color === selectedColor ? "4px solid black" : "2px solid black"
                        }}
                        onClick={() => setSelectedColor(color,)}>

                    </div>
                ))}
            </div>
        </>
    )
}