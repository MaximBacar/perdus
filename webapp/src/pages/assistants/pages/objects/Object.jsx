import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { ItemStatus } from "@/components/statuses/ItemStatus";
import { PageTransition } from "@/components/PageTransition";

export const ObjectPage = () => {
  const { objectId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!objectId) return;

    const unsubscribe = onSnapshot(doc(db, "items", objectId), (snap) => {
      if (snap.exists()) {
        setItem({ id: snap.id, ...snap.data() });
      }
    });

    return () => unsubscribe();
  }, [objectId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (!item) {
    return <div className="p-4 text-muted-foreground">Loading...</div>;
  }

  return (
    <PageTransition className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{item.title || "Object"}</h1>
        <ItemStatus status={item.inquiry_id ? "matched" : "lost"}/>
       
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt="Object"
              className="w-64 h-64 object-cover rounded-lg"
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Description</h2>
            <p className="text-base">{item.description || "-"}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Date Added</h2>
            <p className="text-sm">{formatDate(item.date_added)}</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
