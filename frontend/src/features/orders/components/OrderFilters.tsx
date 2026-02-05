import { OrderStatus } from '../types/order.types'

interface OrderFiltersProps {
  selectedStatus?: OrderStatus
  onStatusChange: (status?: OrderStatus) => void
}

const statusOptions = [
  { value: undefined, label: 'All Orders' },
  { value: OrderStatus.PENDING, label: 'Pending' },
  { value: OrderStatus.CONFIRMED, label: 'Confirmed' },
  { value: OrderStatus.PREPARING, label: 'Preparing' },
  { value: OrderStatus.READY, label: 'Ready' },
  { value: OrderStatus.COMPLETED, label: 'Completed' },
  { value: OrderStatus.CANCELLED, label: 'Cancelled' },
]

export default function OrderFilters({ selectedStatus, onStatusChange }: OrderFiltersProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Filter:</span>
      <div className="flex space-x-2">
        {statusOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onStatusChange(option.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              selectedStatus === option.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}