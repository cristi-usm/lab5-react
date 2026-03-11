function Cell({ color, onPaint }) {
  return (
    <div
      onMouseDown={onPaint}
      onMouseEnter={onPaint}
      style={{
        width: 25,
        height: 25,
        border: "1px solid #ccc",
        backgroundColor: color,
        boxSizing: "border-box",
      }}
    />
  );
}

export default Cell