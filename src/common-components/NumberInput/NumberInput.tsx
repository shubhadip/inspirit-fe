import * as React from "react";
import "./NumberInput.scss";

interface IProps {
  value?: string;
  onChange?: (val: any) => void;
  onValid?: string;
  onBlur?: (val: any) => void;
  label?: string;
  customClass?: string;
  placeholder?: string;
  isValidateOnBlur?: boolean;
  validations?: any;
  errorClass?: string;
  maxLength?: number;
  disabled?: boolean;
  onKeyUp?: (event: React.KeyboardEvent) => any;
  onKeyDown?: (event: React.KeyboardEvent) => any;
  description?: string;
  ellipsisOnOverflow?: boolean;
  customInputClass?: string;
  prefixText?: string;
  prefixParentClass?: string;
  capitalize?: boolean;
  onEnterPress?: (event?: any) => void;
  focusOnMount?: boolean;
  onFocus?: () => void;
  readOnly?: boolean;
  hidePlaceholder?: boolean;
  showLabel?: boolean;
  name?: string;
  autoFocus: boolean;
}

const NumberInput = (props: IProps) => {
  
  const {
    prefixText,
    customClass,
    ellipsisOnOverflow,
    prefixParentClass,
  } = props;

  const uniqueKey = new Date().getTime().toString();
  const isShowFloatingLabel =
    (props.value !== "" && props.value !== undefined && props.value !== null) || prefixText;
  const labelClass = isShowFloatingLabel
    ? "w--text_input--label-minimized"
    : "w--text_input--label-full";

  const className = `w--text_input ${customClass || ""}
			${ellipsisOnOverflow ? "text_ellipsis" : ""}
			${prefixParentClass}`;

  const handleChange = (e : React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value
    if(props.onChange){
      props.onChange(value)
    }
  }
  
  return (
    <div className={className}>
        <div>
          <label
            className={"form-label w--text_input--label " + labelClass}
            htmlFor={uniqueKey}
          >
            {isShowFloatingLabel || props.showLabel
              ? props.label
              : ""}
          </label>
        </div>
        {prefixText ? <span className="input-prefix">{prefixText}</span> : null}
        <input
          autoFocus={props.autoFocus}
          id={uniqueKey}
          type="number"
          name={props.name}
          tabIndex={0}
          value={props.value}
          onChange={handleChange}
          disabled={props.disabled}
          className={
            (props.customInputClass ? props.customInputClass : "",
            `${"form-control"}`)
          }
          spellCheck={false}
          maxLength={props.maxLength}
          readOnly={props.readOnly}
          placeholder={props.hidePlaceholder ? "" : props.placeholder}
          autoComplete={"none"}
        />
      </div>
  )
}

NumberInput.defaultProps = {
  value: "",
  label: "",
  customClass: "",
  placeholder: "",
  isValidateOnBlur: true,
  validations: [],
  errorClass: "",
  disabled: false,
  ellipsisOnOverflow: false,
  capitalize: false,
  focusOnMount: false,
  readOnly: false,
  autoFocus: false,
};


export default NumberInput;
