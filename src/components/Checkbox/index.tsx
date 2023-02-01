import clsx from "clsx";

import icons from "assets/icons";

import styles from "./checkbox.module.scss";

type Props = {
  active?: boolean;
  text: string;
  setState: React.MouseEventHandler<HTMLButtonElement>;
};

const Checkbox: React.FC<Props> = ({ active, text, setState }) => {
  return (
    <button
      className={
        active ? clsx(styles.checkbox, styles.checkbox_active) : styles.checkbox
      }
      onClick={setState}
    >
      {text}
      {active && (
        <img src={icons.cross} alt="cross-img" style={{ marginLeft: "10px" }} />
      )}
    </button>
  );
};

export default Checkbox;
