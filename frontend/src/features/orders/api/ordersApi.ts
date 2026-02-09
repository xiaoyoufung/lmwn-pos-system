import { apiClient } from '@/lib/client';
import type { Order, CreateOrderInput, UpdateOrderStatusInput } from '../types/order.types';

export const ordersApi = {
  getOrders: async (params?: { status?: string; page?: number; limit?: number }) => {
    const { data } = await apiClient.get<{ data: Order[] }>('/orders/54e8b23d-fa33-4e63-9147-c08cf7420f2c', { params })
    return data
  },

  getOrderById: async (id: string) => {
    const { data } = await apiClient.get<Order>(`/orders/${id}`)
    return data
  },

  createOrder: async (input: CreateOrderInput) => {
    const { data } = await apiClient.post<Order>('/orders', input)
    return data
  },

  updateOrderStatus: async (id: string, input: UpdateOrderStatusInput) => {
    const { data } = await apiClient.patch<Order>(`/orders/${id}/status`, input)
    return data
  },

  cancelOrder: async (id: string, reason: string, changedBy: string) => {
    const { data } = await apiClient.delete<Order>(`/orders/${id}`, {
      data: { reason, changedBy },
    })
    return data
  },
}