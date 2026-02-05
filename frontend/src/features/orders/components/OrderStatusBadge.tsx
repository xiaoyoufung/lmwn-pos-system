import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '../types/order.types'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

const statusConfig: Record<
  OrderStatus,
  { variant: 'default' | 'link' | 'secondary' | 'destructive' | 'outline' | 'ghost'; label: string }
> = {
  [OrderStatus.PENDING]: { variant: 'secondary', label: 'Pending' },
  [OrderStatus.CONFIRMED]: { variant: 'default', label: 'Confirmed' },
  [OrderStatus.PREPARING]: { variant: 'default', label: 'Preparing' },
  [OrderStatus.READY]: { variant: 'default', label: 'Ready' },
  [OrderStatus.COMPLETED]: { variant: 'default', label: 'Completed' },
  [OrderStatus.CANCELLED]: { variant: 'destructive', label: 'Cancelled' },
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status]
  // Map custom variants to allowed Badge variants
  const variantMap: Record<string, 'default' | 'link' | 'secondary' | 'destructive' | 'outline' | 'ghost'> = {
    success: 'default',
    warning: 'secondary',
    danger: 'destructive',
    info: 'default',
    default: 'default',
  }
  const badgeVariant = variantMap[config.variant] ?? 'default'
  return <Badge variant={badgeVariant}>{config.label}</Badge>
}