import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addObject } from "@/requests/objects"

import { Plus } from "lucide-react"


export const NewObject = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleAdd = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      await addObject(file);
      setOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      if (!value) handleClose();
      else setOpen(true);
    }}>
        <DialogTrigger asChild>
            <Button variant="outline">
                <Plus/>
                Add Object
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new lost object</DialogTitle>
              <DialogDescription>
                  Upload an image of the lost object to add it to the database.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-contain rounded-md"
                />
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer hover:border-primary text-muted-foreground text-sm"
                >
                  Click to select an image
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {preview && (
                <Button variant="ghost" size="sm" onClick={() => {
                  setFile(null);
                  setPreview(null);
                  fileInputRef.current.value = "";
                }}>
                  Remove image
                </Button>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={!file || isUploading}>
                {isUploading ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
