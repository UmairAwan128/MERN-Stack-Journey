import React from "react";

const ListGroup = props => {
  //we added two more additional properties to our component to make it
  //flexible with all kind of table or object e.g in our case id property
  //name is _id but in other cases it can be user_id or other so now
  //user will pass the name of its properties to our component and we will
  //access that property or column as items[propName] inspite of old way items._id
  //additionally we assigned these properties some defult value as in case of monogoDB every
  //table by convertion has primary key field name _id so now if the name of the
  //field is different then pass else don,t pass these props.

  const {
    items,
    selectedItem,
    onItemSelect,
    textPropertyName,
    idPropertyName
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
          key={
            //as now we added a new genre named "AllGenre" we added to genres in componentDidMount()
            // and it don,t have _id field so we check here if id property exist then assign that
            //id as key else assign name of listgroup as key of the <li>
            item[idPropertyName] ? item[idPropertyName] : item[textPropertyName]
          }
          style={{ cursor: "pointer" }}
        >
          {item[textPropertyName]}
        </li>
      ))}
    </ul>
  );
};

//we assigned these properties some defult value as in case of monogoDB every
//table by convertion has primary key field name _id
ListGroup.defaultProps = {
  textPropertyName: "name",
  idPropertyName: "_id"
};

export default ListGroup;
