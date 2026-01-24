import { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { ArrowUp, Camera } from "lucide-react"
import { useState, useRef } from "react"

export const Lost = () => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const isValid = description.trim().length >= 5;

    const handleImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = () => {
        if (!isValid) return;
        // TODO: Send description and image to backend
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className="flex flex-col items-center w-full max-w-4xl">

                <h1 className="text-3xl w-full text-center mb-8">How can I help you today?</h1>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                />

                {image && (
                    <div className="mb-4 text-sm text-muted-foreground">
                        Selected: {image.name}
                    </div>
                )}

                <InputGroup className="rounded-2xl">
                    <InputGroupTextarea
                        id="block-end-textarea"
                        placeholder="Describe your lost item and/or send a picture"
                        className="text-xl"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <InputGroupAddon align="block-end" className="w-full flex flex-row gap-2 justify-end">
                        <InputGroupButton
                            variant={image ? "default" : "outline"}
                            size="xl"
                            className="rounded-full"
                            onClick={handleCameraClick}
                        >
                            <Camera/>
                        </InputGroupButton>
                        <InputGroupButton
                            variant="default"
                            size="xl"
                            className="rounded-full"
                            onClick={onSubmit}
                            disabled={!isValid}
                        >
                            <ArrowUp/>
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>

            </div>
        </div>
    )
}
