import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DraggableDetail({ detail, onDelete, onChange }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: detail.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex gap-4 items-start group"
    >
      <button
        className="mt-2.5 p-1.5 text-gray-500 hover:text-gray-700 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 grid grid-cols-2 gap-4">
        <Input
          placeholder="Title"
          value={detail.title}
          onChange={(e) => onChange(detail.id, "title", e.target.value)}
        />
        <Input
          placeholder="Value"
          value={detail.value}
          onChange={(e) => onChange(detail.id, "value", e.target.value)}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(detail.id)}
        className="mt-2"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}