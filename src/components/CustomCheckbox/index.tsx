import styles from "./customCheckbox.module.scss";

type Props = {
  id: string;
  text: string;
};

const CustomCheckbox: React.FC<Props> = ({ id, text }) => {
  return (
    <div>
      <input type="checkbox" id={id} className={styles.custom_checkbox} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
};

export default CustomCheckbox;
