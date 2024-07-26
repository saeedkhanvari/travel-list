import { useState } from "react";
import Counter from "./Challenge";

let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
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
function PackingList({ initialItems, items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity + " "}
        {item.description}
      </span>
      <button style={{ color: "red" }}>X</button>
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
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
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
        />
        <Status />
      </div>
    </>
  );
}
