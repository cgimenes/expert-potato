import Habit from "./habit";

export default function Habits({ habits }) {
  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
        <div className="space-y-4">
          {habits.map(habit => (
            <Habit key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  )
}