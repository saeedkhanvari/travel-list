import { useState } from "react";
import Counter from "./Challenge";

let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function Logo() {
  return (
    <>
      <h1>Far Away 🧳</h1>
    </>
  );
}
function Form({ onAddItems }) {
  const [description, setDiscription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      package: false,
    };

    onAddItems(newItem);

    console.table(newItem);
    setDiscription("");
    setQuantity(1);
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>what do you need for your trip? </h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item..."
          value={description}
          onChange={(e) => setDiscription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
}
function PackingList({ initialItems, items, onDeleteItems, onUpdateItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onUpdateItems={onUpdateItems}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItems, onUpdateItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onUpdateItems(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity + " "}
        {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)} style={{ color: "red" }}>
        X
      </button>
    </li>
  );
}
function Status() {
  return (
    <>
      <footer className="stats"></footer>
    </>
  );
  <em> you have x items on your list, and you already packed X (X%) </em>;
}

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        {/* <Counter /> */}
        <PackingList
          initialItems={initialItems}
          items={items}
          setItems={setItems}
          onDeleteItems={handleDeleteItem}
          onUpdateItems={handleToggleItem}
        />
        <Status />
      </div>
    </>
  );
}
