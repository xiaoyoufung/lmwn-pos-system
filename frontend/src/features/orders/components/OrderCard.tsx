import { Link } from 'react-router-dom'
import type { Order } from '../types/order.types'
import { formatMoney, formatDateTime } from '@/utils/formatters'
import OrderStatusBadge from './OrderStatusBadge'
import { Card } from '@/components/ui/card'

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const items = order._items || []
  const tableDisplay = order.tableId ? `Table ${order.displayId}` : `Order #${order.displayId}`
  
  return (
    <Link to={`/orders/${order.id}`}>
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900">{tableDisplay}</h3>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-1">
              {items.length} item{items.length !== 1 && 's'} •{' '}
              {formatDateTime(order.createdAt)}
            </p>
            <ul>
              {items.slice(0, 3).map((item) => (
                <li key={item.id} className="text-sm text-gray-700">
                  {item.quantity} x {item.itemNameSnapshot}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatMoney(order.totalMinor)}</p>
            {order.discountTotalMinor > 0 && (
              <p className="text-sm text-danger-600">
                -{formatMoney(order.discountTotalMinor)} discount
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}