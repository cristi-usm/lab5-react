export default function Toolbar({ onReset, onSave }) {
  return (
    <div className="toolbar">
      <button className="action-button save-button" onClick={onSave}>
        Save
      </button>

      <button className="action-button reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}