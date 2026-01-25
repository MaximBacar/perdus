import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InquiryStatus } from "@/components/statuses/InquiryStatus";
import { PageTransition } from "@/components/PageTransition";

export const InquiryDetail = () => {
  const { inquiryId } = useParams();
  const { user } = useAuth();
  const [inquiry, setInquiry] = useState(null);

  useEffect(() => {
    if (!user || !inquiryId) return;

    const inquiryRef = doc(db, "users", user.uid, "inquiries", inquiryId);
    const unsubscribe = onSnapshot(inquiryRef, (snap) => {
      if (snap.exists()) {
        setInquiry({ id: snap.id, ...snap.data() });
      }
    });

    return () => unsubscribe();
  }, [user, inquiryId]);

  if (!inquiry) {
    return <div className="p-4 text-muted-foreground">Loading...</div>;
  }

  return (
    <PageTransition className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Inquiry</h1>
          <span className="text-sm text-muted-foreground font-mono">{inquiryId}</span>
        </div>
        <InquiryStatus status={inquiry.status} />
      </div>

      <Card className="w-full max-w-2xl shadow-none">
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
    </PageTransition>
  );
}
