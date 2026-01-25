import { Badge } from "../ui/badge"

export const InquiryStatus = ({ status }) => {
    const STATUSES = {
        'review': {title:'In Review', color:'bg-blue-700'},
        'matched':{title:'Matched', color:'bg-green-300'},
        'resolved':{title:'Resolved', color:'bg-green-700'}
    }

  return (
    <Badge className={STATUSES[status]?.color}>
        {STATUSES[status]?.title}
    </Badge>
  )
}
