import Spinner from "./../Spinner/Spinner";
import "./Button.scss";
const prefixClassName = "w--button";

// ButtonThemes are suffix css classes to w--button
type ButtonTheme =
  | "orange"
  | "empty"
  | "orange-gradient"
  | "basedark"
  | "loading"
  | "link"
  | "lightblue"
  | "bordered";

interface IProps {
  title?: any;
  type?: "" | "loading";
  customClass?: string;
  onClick?: any;
  disabled?: boolean;
  disableOnLoading?: boolean;
  member?: string;
  customValueAttr?: any;
  // ref?: string;
  theme?: ButtonTheme;
  name?: string;
}

const  Button = (props: IProps) => {
  const {
    title,
    type = "",
    customClass = "",
    disabled = false,
    disableOnLoading,
    theme,
  } = props;

  const themeClassName = theme ? `${prefixClassName}--${theme}` : "";
  const className = `${prefixClassName} ${customClass} ${type} ${themeClassName}`;
  const tooltip = typeof title === "string" ? title.toString() : "";
  const isLoading = type === "loading";
  const isDisabled = disabled || (disableOnLoading && isLoading);

  return (
    <button
      name={props.name}
      disabled={isDisabled}
      title={tooltip}
      onClick={(evt) =>
        props.onClick &&
        props.onClick(evt, props.customValueAttr)
      }
      className={className}
    >
      {isLoading ? <Spinner /> : title}
    </button>
  );
}

export default Button;
