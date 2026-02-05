import { Link } from 'react-router-dom'
import type { Order } from '../types/order.types'
import { formatMoney, formatDateTime } from '@/utils/formatters'
import OrderStatusBadge from './OrderStatusBadge'
import { Card } from '@/components/ui/card'

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link to={`/orders/${order.id}`}>
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {order.items.length} item{order.items.length !== 1 && 's'} •{' '}
              {formatDateTime(order.createdAt)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatMoney(order.totalAmount)}</p>
            {order.discountAmount > 0 && (
              <p className="text-sm text-danger-600">
                -{formatMoney(order.discountAmount)} discount
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}