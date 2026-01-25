import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InquiryStatus } from "@/components/statuses/InquiryStatus";
import { PageTransition } from "@/components/PageTransition";

export const InquiryPage = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ref = collection(db, "users", user.uid, "inquiries");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInquiries(data);
    });

    return () => unsubscribe();
  }, [user]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <PageTransition className="flex flex-col w-full h-full p-4">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <Table>
          <TableCaption>Your inquiries.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="max-w-xs">
                  <Link
                    to={`/queries/${inquiry.id}`}
                    className="hover:underline text-primary block truncate"
                  >
                    {inquiry.description || "-"}
                  </Link>
                </TableCell>
                <TableCell>
                  <InquiryStatus status={inquiry.status}/>
                </TableCell>
                <TableCell>{formatDate(inquiry.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </PageTransition>
  );
}
