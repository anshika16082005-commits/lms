"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

type confirmDeleteProps = {
  courseId: string;
  onConfirm: () => void;
};
export default function ConfirmDeleteDialog({
  courseId,
  onConfirm,
}: confirmDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/mycourses?courseId=${courseId}`, {
        method: "DELETE",
      });
      const { message } = await res.json();
      toast.success(message);
      onConfirm();
      setOpen(false);
    } catch (err) {
      toast.error("Course Delete Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Delete size={10} />
          Delete
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Confirm Delete
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this course?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
