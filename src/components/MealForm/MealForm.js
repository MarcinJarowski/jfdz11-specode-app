import React from "react";
import {
  formContainer,
  chooseMealTitle,
  chooseMealType,
  chooseMealName,
  chooseMealCalories,
  submit
} from "./MealForm.module.css";

class MealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "śniadanie"
    };
  }
  handleChangeOne = event => {
    this.setState({ inputValueOne: event.target.value });
    console.log(this.props);
  };
  handleChangeTwo = event => {
    this.setState({ inputValueTwo: event.target.value });
  };
  handleChangeSelect = event => {
    this.setState({ selectValue: event.target.value });
  };

  handleSubmit = event => {
    this.props.addToMealsArray({
      name: this.state.inputValueOne,
      calories: this.state.inputValueTwo,
      type: this.state.selectValue,
      id: this.props.newMealId
    });
    event.preventDefault();
    this.props.updateMealId();
  };

  render() {
    return (
      <form className={formContainer} onSubmit={this.handleSubmit}>
        <label>
          <h3>Wybierz posiłek</h3>
        </label>
        <select
          className={chooseMealType}
          value={this.state.selectValue}
          onChange={this.handleChangeSelect}
        >
          <option value="śniadanie">Śniadanie</option>
          <option value="obiad">Obiad</option>
          <option value="kolacja">Kolacja</option>
        </select>
        <input
          className={chooseMealName}
          type="ext"
          placeholder="nazwa posiłku"
          value={this.state.inputValueOne}
          onChange={this.handleChangeOne}
        />
        <input
          className={chooseMealCalories}
          type="number"
          placeholder="ilość kalorii"
          value={this.state.inputValueTwo}
          onChange={this.handleChangeTwo}
        />
        <input type="submit" value="Submit" className={submit} />
      </form>
    );
  }
}

export default MealForm;
