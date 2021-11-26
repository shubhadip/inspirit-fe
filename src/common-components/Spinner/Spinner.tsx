
interface IProps {
  customClass?: string;
}

const Spinner = (props: IProps) => {
  
  const customClass = props.customClass;

  return (
    <div className={"w--spinner " + (customClass ? customClass : "")}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
  
}

export default Spinner;
