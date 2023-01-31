type Props = {
  text: string;
  setState: any;
};

const DropDownButton: React.FC<Props> = ({ text, setState }) => {
  return (
    <div onClick={setState}>
      <p>{text}</p>
    </div>
  );
};

export default DropDownButton;
