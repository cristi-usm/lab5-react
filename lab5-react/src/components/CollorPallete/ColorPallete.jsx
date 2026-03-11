import styles from "./ColorPallete.module.css";
import { Circle } from "@components/Circle";
import { Button } from "@components/Button";

export function ColorPallete({
  onColorSelect,
  selectedColor,
  onSave,
  onReset,
  colorsArr,
}) {
  return (
    <div className={styles.container}>
      {colorsArr.map((color) => (
        <Circle
          key={color.id}
          color={color.code}
          isSelected={selectedColor === color.code}
          onClickColor={() => onColorSelect(color.code)}
        ></Circle>
      ))}
      <Button onClick={() => onSave()}>Save</Button>
      <Button onClick={() => onReset()}>Reset</Button>
    </div>
  );
}

export default ColorPallete;
