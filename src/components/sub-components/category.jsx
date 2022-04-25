import React from "react";

const Category = ({ category, handleCategories }) => {
  return (
    <span
      className={category.active ? "category--active" : ""}
      onClick={() => {
        handleCategories((prevCategories) => {
          let newArray = prevCategories.map((item) => {
            item.active = item.text === category.text ? true : false;
            return item;
          });
          return newArray;
        });
      }}
    >
      {category.text}
    </span>
  );
};

export default Category;
