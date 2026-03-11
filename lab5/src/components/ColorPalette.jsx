export default function ColorPalette({
  colors,
  selectedColor,
  setSelectedColor
}) {
  return (
    <div className="palette">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`color-swatch ${selectedColor === color ? "active" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
          title={color}
        />
      ))}
    </div>
  );
}