import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ordersApi } from '../api/ordersApi'
import type { CreateOrderInput } from '../types/order.types'

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateOrderInput) => ordersApi.createOrder(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Order created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create order')
    },
  })
}