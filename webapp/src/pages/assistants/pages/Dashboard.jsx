import { useEffect, useState } from "react"
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
import { getRecentInquiries } from "@/requests/inquiries"
import { getRecentItems } from "@/requests/objects"

export const Dashboard = () => {
  const [inquiries, setInquiries] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [inquiriesRes, itemsRes] = await Promise.all([
          getRecentInquiries(5),
          getRecentItems(5),
        ])
        setInquiries(inquiriesRes.inquiries || [])
        setItems(itemsRes.items || [])
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <PageTransition className='w-full h-full flex flex-col gap-6'>
      <div className='flex flex-row w-full justify-between gap-4'>
        <StatCard title="Pending Inquiries" value={340} />
        <StatCard title="Lost objects" value={340} />
        <StatCard title="Pending Inquiries" value={340} />
        <StatCard title="Pending Inquiries" value={340} />
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
                    <TableCell>{inquiry.status}</TableCell>
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
                    <TableCell>{item.status}</TableCell>
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
