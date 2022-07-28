<template #item="{element}">
  <draggable
      :list="documentsArray"
      ghost-class="dragging"
      item-key="id">
    <template #item="{element}">
      <div>
        <ParentItem :passedData="element"/>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import ParentItem from "@/components/ParentItem";

export default {
  name: 'ListComponent',
  components: {
    ParentItem,
    draggable
  },
  props: ['passedData'],
  computed: {
    documentsArray: {
      get() {
        return this.passedData
      },
      set(value) {
        this.$store.commit('updateList', value)
      }
    }
  }
};
</script>
<style>
.dragging {
  box-shadow: 0 3px 16px rgba(0, 102, 255, 0.7);
}
</style>