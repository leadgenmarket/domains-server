import React, { useState } from "react"
import {useCheckbox} from '@react-aria/checkbox';
import {useToggleState} from '@react-stately/toggle';
import {VisuallyHidden} from '@react-aria/visually-hidden';
import {useFocusRing} from '@react-aria/focus';

function Checkbox(props) {
  let state = useToggleState(props);
  let ref = React.useRef();
  let {inputProps} = useCheckbox(props, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  return (
    <label style={{display: 'flex', alignItems: 'center', marginTop: "15px"}}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg
        width={24}
        height={24}
        aria-hidden="true"
        style={{marginRight: 4}}>
        <rect
          x={props.checked ? 4 : 5}
          y={props.checked ? 4 : 5}
          width={props.checked ? 16 : 14}
          height={props.checked ? 16 : 14}
          fill={props.checked ? `white` : 'none'}
          stroke={props.checked ? 'none' : `white`}
          strokeWidth={2} />
        {props.checked &&
          <path
            transform="translate(7 7)"
            fill={props.checked ? `#${props.params.main_color}` : 'none' }
            d={`M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1
            1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712
            6A.999.999 0 0 1 3.788 9z`} />
        }
        {isFocusVisible &&
          <rect
            x={1}
            y={1}
            width={24}
            height={24}
            fill="none"
            stroke="orange"
            strokeWidth={2} />
        }
      </svg>
      {props.children}
    </label>
  );
}

const CheckBoxItem = ({step, form, setForm, checked, updateCheck, index, params,nextStep, prevStep,  answer}) => {
    return <div  key={answer+"_wr"} style={{position:"relative", cursor: "pointer", fontSize: "22px", color: "#FFF", lineHeight: "22px", textDecoration : "underline"}} className="act">
            <Checkbox params={params} name="tac" checked={checked} onChange={()=>{updateCheck(answer)}} style={{display:"flex"}}>
                {answer}
            </Checkbox>
        </div>
}

export default CheckBoxItem