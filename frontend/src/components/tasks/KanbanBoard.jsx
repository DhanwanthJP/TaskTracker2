import { useState } from 'react';
import TaskCard from './TaskCard.jsx';
import { STATUSES } from '../../constants.js';
import { useTasks } from '../../context/TaskContext.jsx';
import { btnLink } from '../../styles.js';

// Three columns (To Do / In Progress / Done). Move a task with the arrow buttons or by dragging it.
// Buttons are the touch-screen and keyboard alternative, because drag-and-drop does not work on phones.
export default function KanbanBoard({ tasks }) {
  const { changeStatus } = useTasks();
  const [dragOverColumn, setDragOverColumn] = useState(null);

  function handleDrop(event, status) {
    event.preventDefault();
    setDragOverColumn(null);
    const id = Number(event.dataTransfer.getData('text/plain'));
    const task = tasks.find((t) => t.id === id);
    if (task && task.status !== status) changeStatus(id, status);
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {STATUSES.map((column, index) => {
        const columnTasks = tasks.filter((task) => task.status === column.value);
        const previous = STATUSES[index - 1];
        const next = STATUSES[index + 1];

        return (
          <section
            key={column.value}
            aria-label={column.label}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOverColumn(column.value);
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setDragOverColumn(null);
            }}
            onDrop={(event) => handleDrop(event, column.value)}
            className={`rounded-lg border p-3 ${
              dragOverColumn === column.value ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-slate-100'
            }`}
          >
            <h3 className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-800">
              {column.label}
              <span className="rounded bg-white px-2 py-0.5 text-xs font-medium text-slate-700">
                {columnTasks.length}
              </span>
            </h3>

            {columnTasks.length === 0 ? (
              <p className="rounded border border-dashed border-slate-300 px-3 py-6 text-center text-sm text-slate-600">
                No tasks here
              </p>
            ) : (
              <ul className="space-y-3">
                {columnTasks.map((task) => (
                  <li
                    key={task.id}
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData('text/plain', String(task.id));
                      event.dataTransfer.effectAllowed = 'move';
                    }}
                  >
                    <TaskCard task={task} compact showToggle={false} />
                    <div className="mt-1 flex justify-between gap-2 px-1">
                      {previous ? (
                        <button type="button" className={btnLink} onClick={() => changeStatus(task.id, previous.value)}>
                          &larr; {previous.label}
                        </button>
                      ) : (
                        <span />
                      )}
                      {next ? (
                        <button type="button" className={btnLink} onClick={() => changeStatus(task.id, next.value)}>
                          {next.label} &rarr;
                        </button>
                      ) : (
                        <span />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
