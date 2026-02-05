import { useQuery } from '@tanstack/react-query'
import { ordersApi } from '../api/ordersApi'
import { OrderStatus } from '../types/order.types'

export function useOrders(status?: OrderStatus) {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () => ordersApi.getOrders(status ? { status } : undefined),
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}