import * as React from "react";
import { useState } from "react";
import "./PasswordInput.scss";

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
  refIp?: any;
  name?: string;
  showLabel?: boolean;
}

const Password = (props: IProps) => {
  const [value, setValue] = useState(props.value);


    const {
      prefixText,
      customClass,
      ellipsisOnOverflow,
      prefixParentClass,
    } = props;

    const uniqueKey = new Date().getTime().toString();
    const isShowFloatingLabel =
      (value !== "" && value !== undefined && value !== null) ||
      prefixText;
    const labelClass = isShowFloatingLabel
      ? "w--password_input--label-minimized"
      : "w--password_input--label-full";

    const className = `w--password_input ${
      customClass || ""
    }
			${ellipsisOnOverflow ? "text_ellipsis" : ""}
			${prefixParentClass}`;

    const handleChange = (e : React.SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      const value = target.value
      setValue(value)
      if(props.onChange){
        props.onChange(value)
      }
    }
    
    return (
      <div className={className}>
        <div>
          <label
            className={"w--password_input--label " + labelClass}
            htmlFor={uniqueKey}
          >
            {isShowFloatingLabel || props.showLabel
              ? props.label
              : ""}
          </label>
        </div>
        {prefixText ? <span className="input-prefix">{prefixText}</span> : null}
        <input
          id={uniqueKey}
          ref={props.refIp}
          type="password"
          tabIndex={0}
          value={value}
          onChange={handleChange}
          disabled={props.disabled}
          name={props.name}
          className={
            props.customInputClass ? props.customInputClass : ""
          }
          spellCheck={false}
          maxLength={props.maxLength}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          autoComplete={"none"}
        />
        <hr />
      </div>
    );
  
}

Password.defaultProps = {
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
};

export default Password;
