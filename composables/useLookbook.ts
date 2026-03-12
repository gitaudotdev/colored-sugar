import type { LookbookItem } from '~/types/shopify'

export function useLookbook() {
  return useAsyncData<LookbookItem[]>('lookbook', () => $fetch('/api/shopify/lookbook'))
}
