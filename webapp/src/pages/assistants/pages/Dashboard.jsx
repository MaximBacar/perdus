import { useEffect, useState } from "react"
import { collection, collectionGroup, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { StatCard } from "@/components/stat-card/StatCard"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageTransition } from "@/components/PageTransition"

export const Dashboard = () => {
  const [inquiries, setInquiries] = useState([])
  const [items, setItems] = useState([])
  const [stats, setStats] = useState({
    pendingInquiries: 0,
    lostObjects: 0,
    closedInquiries: 0,
    objectsResolved: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Subscribe to items collection
    const unsubscribeItems = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Sort by date and take recent 5
      const sorted = itemsData.sort((a, b) => {
        const dateA = a.date_added?.toDate?.() || new Date(a.date_added) || 0
        const dateB = b.date_added?.toDate?.() || new Date(b.date_added) || 0
        return dateB - dateA
      })
      setItems(sorted.slice(0, 5))

      // Calculate stats based on inquiry_id presence
      const lostObjects = itemsData.filter((item) => !item.inquiry_id).length
      const objectsResolved = itemsData.filter((item) => item.inquiry_id).length

      setStats((prev) => ({ ...prev, lostObjects, objectsResolved }))
    })

    // Subscribe to inquiries collection group
    const unsubscribeInquiries = onSnapshot(collectionGroup(db, "inquiries"), (snapshot) => {
      const inquiriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Sort by date and take recent 5
      const sorted = inquiriesData.sort((a, b) => {
        const dateA = a.created_at?.toDate?.() || new Date(a.created_at) || 0
        const dateB = b.created_at?.toDate?.() || new Date(b.created_at) || 0
        return dateB - dateA
      })
      setInquiries(sorted.slice(0, 5))

      // Calculate stats
      const pendingInquiries = inquiriesData.filter(
        (inq) => !inq.status || inq.status === "processing" || inq.status === "review" || inq.status === "matched"
      ).length
      const closedInquiries = inquiriesData.filter((inq) => inq.status === "resolved").length

      setStats((prev) => ({ ...prev, pendingInquiries, closedInquiries }))
      setLoading(false)
    })

    return () => {
      unsubscribeItems()
      unsubscribeInquiries()
    }
  }, [])

  const formatDate = (timestamp) => {
    if (!timestamp) return "-"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <PageTransition className='w-full h-full flex flex-col gap-6'>
      <div className='flex flex-row w-full justify-between gap-4'>
        <StatCard title="Pending inquiries" value={stats.pendingInquiries} />
        <StatCard title="Lost objects" value={stats.lostObjects} />
        <StatCard title="Closed inquiries" value={stats.closedInquiries} />
        <StatCard title="Objects resolved" value={stats.objectsResolved} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Recent Inquiries</h2>
          <ScrollArea className="h-[300px]">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">No inquiries yet</TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="max-w-[200px] truncate">{inquiry.description || "-"}</TableCell>
                    <TableCell>{inquiry.status || "processing"}</TableCell>
                    <TableCell>{formatDate(inquiry.created_at)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </ScrollArea>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Recent Items</h2>
          <ScrollArea className="h-[300px]">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">No items yet</TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-[200px] truncate">{item.title}</TableCell>
                    <TableCell>{item.inquiry_id ? "matched" : "lost"}</TableCell>
                    <TableCell>{formatDate(item.date_added)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </ScrollArea>
        </div>
      </div>
    </PageTransition>
  )
}
