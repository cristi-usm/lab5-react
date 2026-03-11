function Palette({ colors, currentColor, setCurrentColor }) {
  if (!colors) return null;

  return (
    <div id="palette-container">
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => setCurrentColor(color)}
          className={`palette-color ${currentColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export default Palette