import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { doc, onSnapshot, updateDoc, getDoc, deleteField } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { InquiryStatus } from "@/components/statuses/InquiryStatus";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/PageTransition";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreCircle({ score }) {
  const clamped = Math.max(0, Math.min(100, score ?? 0));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);
  const hue = (clamped / 100) * 120;

  return (
    <div className="relative inline-flex items-center justify-center size-11">
      <svg className="size-11 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={RADIUS} fill="none" stroke="currentColor" className="text-muted" strokeWidth="4" />
        <circle
          cx="22" cy="22" r={RADIUS} fill="none"
          stroke={`hsl(${hue}, 80%, 45%)`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-xs font-semibold">{clamped}</span>
    </div>
  );
}

const STATUSES = [
  { value: "review", label: "In Review", color: "bg-blue-700" },
  { value: "matched", label: "Matched", color: "bg-green-300" },
  { value: "resolved", label: "Resolved", color: "bg-gray-400" },
];

export const Inquiry = () => {
  const { inquiryId } = useParams();
  const { state } = useLocation();
  const userId = state?.userId;

  const [inquiry, setInquiry] = useState(null);
  const [ratedItems, setRatedItems] = useState([]);

  useEffect(() => {
    if (!userId || !inquiryId) return;

    const inquiryRef = doc(db, "users", userId, "inquiries", inquiryId);
    const unsubscribe = onSnapshot(inquiryRef, (snap) => {
      if (snap.exists()) {
        setInquiry({ id: snap.id, ...snap.data() });
      }
    });

    return () => unsubscribe();
  }, [userId, inquiryId]);

  // Fetch item details for each rating
  useEffect(() => {
    const ratings = inquiry?.ratings;
    if (!ratings || ratings.length === 0) {
      setRatedItems([]);
      return;
    }

    Promise.all(
      ratings.slice(0, 5).map(async (r) => {
        const snap = await getDoc(doc(db, "items", r.item_id));
        return {
          ...r,
          ...(snap.exists() ? snap.data() : {}),
        };
      })
    ).then(setRatedItems);
  }, [inquiry?.ratings]);

  const handleStatusChange = async (newStatus) => {
    if (!userId || !inquiryId) return;
    const ref = doc(db, "users", userId, "inquiries", inquiryId);
    await updateDoc(ref, { status: newStatus });
  };

  const handleConfirmMatch = async (itemId) => {
    if (!userId || !inquiryId || !itemId) return;
    const inquiryRef = doc(db, "users", userId, "inquiries", inquiryId);
    const itemRef = doc(db, "items", itemId);
    await Promise.all([
      updateDoc(inquiryRef, { matched_item_id: itemId, status: "resolved" }),
      updateDoc(itemRef, { inquiry_id: inquiryId }),
    ]);
  };

  const handleCancelMatch = async () => {
    if (!userId || !inquiryId || !inquiry.matched_item_id) return;
    const inquiryRef = doc(db, "users", userId, "inquiries", inquiryId);
    const itemRef = doc(db, "items", inquiry.matched_item_id);
    await Promise.all([
      updateDoc(inquiryRef, { matched_item_id: deleteField(), status: "review" }),
      updateDoc(itemRef, { inquiry_id: deleteField() }),
    ]);
  };

  if (!userId) {
    return <div className="p-4 text-muted-foreground">Missing user context.</div>;
  }

  if (!inquiry) {
    return <div className="p-4 text-muted-foreground">Loading...</div>;
  }

  const displayedItems = inquiry.matched_item_id
    ? ratedItems.filter((item) => item.item_id === inquiry.matched_item_id)
    : ratedItems;

  return (
    <PageTransition className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Inquiry</h1>
          <span className="text-sm text-muted-foreground font-mono">{inquiryId}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
                <InquiryStatus status={inquiry?.status}/>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {STATUSES.map((s) => (
              <DropdownMenuItem key={s.value} onClick={() => handleStatusChange(s.value)}>
                <Badge className={s.color}>{s.label}</Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full h-full flex flex-col md:flex-row gap-6">

        <Card className="w-full h-fit shadow-none">
            <CardHeader>
                <CardDescription>Description</CardDescription>
                <CardTitle>{inquiry.description || "-"}</CardTitle>
            </CardHeader>
            <CardContent>
                {inquiry.answers?.length > 0 && (
                    <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">Questions & Answers</h2>
                    <div className="flex flex-col gap-3">
                        {inquiry.answers.map((qa, index) => (
                            <div key={index} className="flex flex-col gap-3">
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm bg-muted">
                                        {qa.question}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm bg-primary text-primary-foreground">
                                        {qa.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                )}
            </CardContent>
        </Card>
        

        <Separator orientation="vertical" className="hidden md:flex"/>

        <div className="flex flex-col w-full">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Top matched items</h2>
          {displayedItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Score</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  {!inquiry.matched_item_id && <TableHead className="w-[50px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedItems.map((item, i) => (
                  <TableRow key={item.item_id || i}>
                    <TableCell>
                      <ScoreCircle score={item.score} />
                    </TableCell>
                    <TableCell>
                      {item.image_url ? (
                        <img src={item.image_url} alt="Item" className="w-12 h-12 object-cover rounded" />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{item.title || "-"}</TableCell>
                    {!inquiry.matched_item_id && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleConfirmMatch(item.item_id)}>
                              Match
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No ratings yet.</p>
          )}
          {inquiry.matched_item_id && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleCancelMatch}
            >
              Cancel match
            </Button>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
