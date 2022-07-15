<template>
  <div class="custom-table">
    <template v-if="items.length > 0">
      <table>
        <thead>
          <tr>
            <th v-for="(header, i) in headers" :key="i">
              {{ header }}
            </th>
            <th v-if="actions" style="text-align: center">...</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in items"
            :key="i"
            :class="{ last: i === items.length - 1 }"
          >
            <td v-for="(item, i) in row" :key="i">
              <div :class="{ first: i === 0 }">
                {{ item }}
              </div>
            </td>
            <td v-if="actions" style="text-align: center">
              <slot name="action" :item="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <table>
        <thead>
          <tr>
            <th v-for="(header, i) in headers" :key="i">
              {{ header }}
            </th>
            <th v-if="actions">...</th>
          </tr>
        </thead>
      </table>
      <div class="custom-table__body-placeholder">Пусто...</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default() {
        return []
      },
    },
    actions: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
