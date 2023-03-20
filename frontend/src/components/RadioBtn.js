const RadioBtn = (id, name, defaultChecked ) => {
    <form className="stats_radio_box">
          <input
            type="radio"
            id="day"
            name="stats_slt"
            value="day"
            defaultChecked="checked"
          />
          <label htmlFor="day" className="radio">
            일간
          </label>
          <input type="radio" id="week" name="stats_slt" value="week" />
          <label htmlFor="week" className="radio">
            주간
          </label>
          <input type="radio" id="month" name="stats_slt" value="month" />
          <label htmlFor="month" className="radio">
            월간
          </label>
        </form>
}

export default RadioBtn();