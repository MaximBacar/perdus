import { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { ArrowUp, Camera } from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Spinner } from "@/components/ui/spinner"
import { PageTransition } from "@/components/PageTransition"
import { createInquiry, getInquiry, postAnswers } from "@/requests/inquiries"

const POLL_INTERVAL = 2000;

export const NewInquiryPage = () => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [input, setInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Chat state
    const [messages, setMessages] = useState([]);
    const [phase, setPhase] = useState("initial"); // initial | processing | questions | submitting | done
    const [inquiryId, setInquiryId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const isValid = description.trim().length >= 5;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, phase]);

    // Poll for inquiry results
    const pollInquiry = useCallback(async (id) => {
        try {
            const data = await getInquiry(id);
            if (data.status === "matched") {
                const q = data.narrowing_questions || [];
                setQuestions(q);
                if (q.length > 0) {
                    setMessages((prev) => [...prev, { role: "assistant", content: q[0] }]);
                    setCurrentQuestionIndex(0);
                    setPhase("questions");
                } else {
                    setPhase("done");
                }
            } else {
                setTimeout(() => pollInquiry(id), POLL_INTERVAL);
            }
        } catch (error) {
            console.error("Polling failed:", error);
            setTimeout(() => pollInquiry(id), POLL_INTERVAL);
        }
    }, []);

    const handleImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) setImage(file);
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    // Submit initial description
    const onSubmitDescription = async () => {
        if (!isValid || isSubmitting) return;

        setIsSubmitting(true);
        const userMessage = description.trim();
        setMessages([{ role: "user", content: userMessage }]);
        setPhase("processing");

        try {
            const result = await createInquiry(userMessage, image);
            setInquiryId(result.inquiry_id);
            pollInquiry(result.inquiry_id);
        } catch (error) {
            console.error("Failed to create inquiry:", error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
            setPhase("initial");
        } finally {
            setIsSubmitting(false);
            setDescription("");
            setImage(null);
        }
    };

    // Submit answer to a narrowing question
    const onSubmitAnswer = async () => {
        const answer = input.trim();
        if (!answer) return;

        const question = questions[currentQuestionIndex];
        const newAnswers = [...answers, { question, answer }];
        setAnswers(newAnswers);
        setMessages((prev) => [...prev, { role: "user", content: answer }]);
        setInput("");

        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questions.length) {
            setMessages((prev) => [...prev, { role: "assistant", content: questions[nextIndex] }]);
            setCurrentQuestionIndex(nextIndex);
        } else {
            // All questions answered, submit
            setPhase("submitting");
            try {
                await postAnswers(inquiryId, newAnswers);
                setMessages((prev) => [...prev, { role: "assistant", content: "Thanks! I've analyzed your answers." }]);
                setPhase("done");
            } catch (error) {
                console.error("Failed to submit answers:", error);
                setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong while submitting your answers." }]);
                setPhase("done");
            }
        }
    };

    // Initial centered input
    if (phase === "initial") {
        return (
            <PageTransition className='w-full h-full flex flex-col items-center justify-center'>
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
                                onClick={onSubmitDescription}
                                disabled={!isValid || isSubmitting}
                            >
                                <ArrowUp/>
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </PageTransition>
        );
    }

    // Chat view
    return (
        <PageTransition className="w-full h-full flex flex-col items-center">
            <div className="flex flex-col w-full max-w-3xl flex-1 overflow-y-auto py-8 px-4 gap-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {(phase === "processing" || phase === "submitting") && (
                    <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl px-4 py-2.5">
                            <Spinner className="size-5" />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {phase === "questions" && (
                <div className="w-full max-w-3xl px-4 pb-6">
                    <InputGroup className="rounded-2xl">
                        <InputGroupTextarea
                            placeholder="Type your answer..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <InputGroupAddon align="block-end" className="w-full flex flex-row justify-end">
                            <InputGroupButton
                                variant="default"
                                size="xl"
                                className="rounded-full"
                                onClick={onSubmitAnswer}
                                disabled={!input.trim()}
                            >
                                <ArrowUp/>
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            )}
        </PageTransition>
    );
}
