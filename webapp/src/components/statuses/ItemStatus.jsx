import { Badge } from "../ui/badge"

export const ItemStatus = ({status}) => {
    const STATUSES = {
        lost:{title: "Lost", color:'bg-black'},
        matched:{title:"Matched", color:'bg-purple-400'}
    }
  return (
    <Badge className={STATUSES[status]?.color}>
        {STATUSES[status]?.title}
    </Badge>
  )
}
