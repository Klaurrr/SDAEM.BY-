type Props = {
  text: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
};

const DropDownButton: React.FC<Props> = ({ text, setState }) => {
  return (
    <div onClick={setState}>
      <p>{text}</p>
    </div>
  );
};

export default DropDownButton;
