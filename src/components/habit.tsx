import axios from "axios";
import { useState } from "react";
import Tags from "./tags";

export default function Habit({ habit }) {
  const [checked, setChecked] = useState(habit.done);
  const [disabled, setDisabled] = useState(false);

  function handleChange() {
    const newChecked = !checked;
    setDisabled(true);

    axios.post('/api/habits/updateProgress', { id: habit.id, done: newChecked })
      .then(_ => {
        setChecked(newChecked);
        setDisabled(false);
      })
      .catch(_ => {
        setDisabled(false);
      });
  }

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="comments"
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
        {habit.name}
        </label>
        <Tags tags={habit.tags} />
      </div>
    </div>
  )
}