import React, { useContext, useEffect } from "react";
import Select from "react-select";
import styles from "./MealsSearch.module.css";
import { MealsContext } from "../../contexts/mealsContext";

const { selectWrapper } = styles;

const MealsSearch = props => {
  const { concatedCommonAndCustom } = useContext(MealsContext);
  // const {} =
  let concatedMealsToArray = Object.values(concatedCommonAndCustom);
  let mapWithLabelAtt = concatedMealsToArray.map(obj => {
    obj.label = obj.name;
    return obj;
  });
  ///TODO ściągnąć common meals i połączyć z tymi uzytkownika
  const groupedOptions = [
    {
      label: "Śniadania",
      options: mapWithLabelAtt.filter(obj => obj.type === "śniadanie")
    },
    {
      label: "Obiady",
      options: mapWithLabelAtt.filter(obj => obj.type === "obiad")
    },
    {
      label: "Kolacje",
      options: mapWithLabelAtt.filter(obj => obj.type === "kolacja")
    }
  ];
  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 200
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center"
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  return (
    <span className={selectWrapper}>
      <Select
        defaultValue={groupedOptions[0].label}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
        onChange={props.onChange}
      />
    </span>
  );
};

export default MealsSearch;
