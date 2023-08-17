import './cb-checkbox.scss'
import React from "react";

export class CheckBox extends React.Component {
  render() {
    return (
      <div className="cb-checkbox">
        <label className="cb-checkbox__field">
          <input className="cb-checkbox__input" type="checkbox"/>
            <span className="cb-checkbox__flag">&nbsp;</span>
            <span className="cb-checkbox__label">Uncheck – Default</span>
        </label>
      </div>
    );
  }
}
