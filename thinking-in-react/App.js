import React, { useState } from "react";
import ReactDOM from "react-dom";

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

function FilterableProductTable({ products }) {
  const [filter, setFilter] = useState({ search: "", onlyStock: false });

  const onSearchChange = (event) => {
    setFilter((prevFilter) => ({ ...prevFilter, search: event.target.value }));
  };

  const onOnlyStockChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      onlyStock: event.target.checked,
    }));
  };

  const getFilteredCategories = () => {
    const categories = {};
    products.forEach((product) => {
      const { category, name } = product;

      // filter
      if (!name.toLowerCase().includes(filter.search)) return;
      if (filter.onlyStock === true && !product.stocked) return;

      // map
      if (categories[category]) categories[category].push(product);
      else categories[category] = [product];
    });

    return categories;
  };

  return (
    <>
      <SearchBar
        filter={filter}
        onOnlyStockChange={onOnlyStockChange}
        onSearchChange={onSearchChange}
      />
      <ProductTable categories={getFilteredCategories()} />
    </>
  );
}

function SearchBar({ filter, onSearchChange, onOnlyStockChange }) {
  const { search, onlyStock } = filter;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onSearchChange}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={onlyStock}
            onChange={onOnlyStockChange}
          />
          Only show products in stock
        </label>
      </div>
    </div>
  );
}

function ProductTable({ categories }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(categories).map(([category, items]) => (
          <ProductCategoryRow
            category={category}
            items={items}
            key={category}
          />
        ))}
      </tbody>
    </table>
  );
}

function ProductCategoryRow({ category, items }) {
  return (
    <>
      <th colSpan={2}>{category}</th>
      {items.map((item) => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.price}</td>
        </tr>
      ))}
    </>
  );
}

function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
