import { useState, useEffect } from "react";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "react-router-dom";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InquiryStatus } from "@/components/statuses/InquiryStatus";
import { PageTransition } from "@/components/PageTransition";

export const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionGroup(db, "inquiries"), (snapshot) => {
      const inquiriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.ref.parent.parent.id,
        ...doc.data(),
      }));
      setInquiries(inquiriesData);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <PageTransition className="flex flex-col w-full h-full p-4">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <Table>
          <TableCaption>All user inquiries.</TableCaption>
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
                <TableCell>
                  <Link
                    to={`/queries/${inquiry.id}`}
                    state={{ userId: inquiry.userId }}
                    className="hover:underline text-primary"
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
