import { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewObject } from "./NewObject";
import { ItemStatus } from "@/components/statuses/ItemStatus";
import { PageTransition } from "@/components/PageTransition";

export const ObjectsPage = () => {
  const [items, setItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("lost");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);

      // Remove pending items that now exist in Firestore
      setPendingItems((prev) =>
        prev.filter((pending) => !itemsData.some((item) => item.id === pending.id))
      );
    });

    return () => unsubscribe();
  }, []);

  const handlePendingItem = (item) => {
    setPendingItems((prev) => [item, ...prev]);
  };

  const getItemStatus = (item) => item.inquiry_id ? "matched" : "lost";

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const status = getItemStatus(item);
      const matchesStatus = status === activeTab;
      const matchesSearch = search.trim() === "" ||
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [items, activeTab, search]);

  // Only show pending items in "lost" tab
  const filteredPendingItems = useMemo(() => {
    if (activeTab !== "lost") return [];
    return pendingItems;
  }, [pendingItems, activeTab]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const ItemsTable = ({ items, pendingItems = [] }) => (
    <ScrollArea className="h-[calc(100vh-280px)] border-b">
      <Table>
        <TableCaption>
          {items.length === 0 && pendingItems.length === 0
            ? "No items found."
            : `${items.length + pendingItems.length} item${items.length + pendingItems.length !== 1 ? "s" : ""} found.`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Found</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingItems.map((item) => (
            <TableRow key={item.id} className="opacity-50 pointer-events-none">
              <TableCell>
                {item.previewUrl ? (
                  <div className="relative">
                    <img
                      src={item.previewUrl}
                      alt="Item"
                      className="w-16 h-16 object-cover rounded grayscale"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="max-w-xs">
                <span className="text-muted-foreground">Processing...</span>
              </TableCell>
              <TableCell>
                <ItemStatus status="lost"/>
              </TableCell>
              <TableCell>{new Date().toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt="Item"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="max-w-xs">
                <Link
                  to={`/objects/${item.id}`}
                  className="hover:underline text-primary block truncate"
                >
                  {item.title || "-"}
                </Link>
              </TableCell>
              <TableCell>
                <ItemStatus status={getItemStatus(item)}/>
              </TableCell>
              <TableCell>{formatDate(item.date_added)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );

  return (
    <PageTransition className="flex flex-col w-full h-full p-4 gap-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <NewObject onPendingItem={handlePendingItem} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="lost">Lost</TabsTrigger>
          <TabsTrigger value="matched">Matched</TabsTrigger>
        </TabsList>
        <TabsContent value="lost">
          <ItemsTable items={filteredItems} pendingItems={filteredPendingItems} />
        </TabsContent>
        <TabsContent value="matched">
          <ItemsTable items={filteredItems} />
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
}
