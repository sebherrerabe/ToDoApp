import React from "react";
import Category from "./sub-components/category";

const ToDoBottom = ({ categories, handleCategories, getLefts }) => {

  const getItemsPhrase = () => {
    let lefts = getLefts();
    if (lefts === 1) return lefts + " item left";
    if (lefts > 1) return lefts + " items left";
    return "No items left";
  };
  return (
    <div className="bottom">
      <p>{getItemsPhrase()}</p>
      <div className="categories">
        {categories.map((category, index) => {
          return (
            <Category
              key={category.text}
              category={category}
              handleCategories={handleCategories}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDoBottom;
