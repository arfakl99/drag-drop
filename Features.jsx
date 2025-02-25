// import { useState } from "react";
// import { Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function Features() {
//   const [details, setDetails] = useState([
//     { id: "1", title: "Architectural Style", value: "Modern" },
//     {
//       id: "2",
//       title: "Accessibility Features",
//       value: "Wheelchair accessible, Elevator access",
//     },
//     { id: "3", title: "Title", value: "Value" },
//   ]);

//   const handleDeleteDetail = (id) => {
//     setDetails(details.filter((detail) => detail.id !== id));
//   };

//   const handleAddMore = () => {
//     const newId = (details.length + 1).toString();
//     setDetails([...details, { id: newId, title: "", value: "" }]);
//   };

//   return (
//     <div className="max-w-7xl mx-auto  space-y-8">
//       <div className="space-y-6">
//         <div className="flex justify-between items-start">
//           <h2 className="text-xl font-semibold">Additional Details</h2>
//           {/* <div className="space-y-2 text-[#6a6b71]">
//             <p>
//               Add additional info for any extra information about your property
//               benefits
//             </p>
//             <p>
//               Add features to highlight the various amenities and
//               characteristics.
//             </p>
//             <p>
//               Add Energy Performance for the property's efficiency,
//               cost-effectiveness
//             </p>
//           </div> */}
//         </div>

//         {details.map((detail) => (
//           <div key={detail.id} className="flex gap-4 items-start">
//             <button className="mt-2.5 p-1.5 text-gray-500 hover:text-gray-700">
//               <svg
//                 className="w-4 h-4"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7 2H13M2 5H18M16 5L15.133 17.142C15.0971 17.6466 14.8713 18.1188 14.5011 18.4636C14.1309 18.8083 13.6439 19 13.138 19H6.862C6.35614 19 5.86907 18.8083 5.49889 18.4636C5.1287 18.1188 4.90292 17.6466 4.867 17.142L4 5"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//             <div className="flex-1 grid grid-cols-2 gap-4">
//               <Input
//                 placeholder="Title"
//                 value={detail.title}
//                 onChange={(e) =>
//                   setDetails(
//                     details.map((d) =>
//                       d.id === detail.id ? { ...d, title: e.target.value } : d
//                     )
//                   )
//                 }
//               />
//               <Input
//                 placeholder="Value"
//                 value={detail.value}
//                 onChange={(e) =>
//                   setDetails(
//                     details.map((d) =>
//                       d.id === detail.id ? { ...d, value: e.target.value } : d
//                     )
//                   )
//                 }
//               />
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => handleDeleteDetail(detail.id)}
//               className="mt-2"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//           </div>
//         ))}

//         <Button
//           variant="ghost"
//           className="text-[#6a6b71]"
//           onClick={handleAddMore}
//         >
//           + Add More
//         </Button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableDetail } from "./DraggableDetail";
export default function Features() {
  const [details, setDetails] = useState([
    { id: "1", title: "Architectural Style", value: "Modern" },
    {
      id: "2",
      title: "Accessibility Features",
      value: "Wheelchair accessible, Elevator access",
    },
    { id: "3", title: "Title", value: "Value" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDeleteDetail = (id) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  const handleAddMore = () => {
    const newId = (details.length + 1).toString();
    setDetails([...details, { id: newId, title: "", value: "" }]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDetails((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDetailChange = (id, field, value) => {
    setDetails(
      details.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">Additional Details</h2>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={details}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {details.map((detail) => (
                <DraggableDetail
                  key={detail.id}
                  detail={detail}
                  onDelete={handleDeleteDetail}
                  onChange={handleDetailChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          variant="ghost"
          className="text-[#6a6b71]"
          onClick={handleAddMore}
        >
          + Add More
        </Button>
      </div>
    </div>
  );
}
