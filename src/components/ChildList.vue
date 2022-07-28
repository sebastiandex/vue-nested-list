<template>
  <draggable
      v-model="passedChildren"
      group="children"
      @start="drag=true"
      ghost-class="dragging"
      @end="drag=false"
      item-key="id"
  >
    <template #item="{element}">
      <div class="childItem">
        <div>{{ element.name }}</div>
        <div v-if="element.blueDot" class="blueDot"/>
        <div v-if="element.twoDots" class="twoDots"/>
        <div v-if="element.greyLabel" class="greyLabel">{{ element.greyLabel }}</div>
        <div class="buttonBlock">
          <button class="actionButton edit"/>
          <button class="actionButton delete"/>
          <button class="actionButton drag"/>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'ChildComponent',
  components: {
    draggable
  },
  props: ['passedData', 'parent', 'openChildren'],
  data() {
    return {
      drag: false,
      dragging: false
    };
  },
  computed: {
    passedChildren: {
      get() {
        return this.parent.children
      },
      set(value) {
        this.updateChildren(value, this.parent.id)
      }
    },
    documentsArray: {
      get() {
        return this.$store.state.list
      },
      set(value) {
        this.$store.commit('updateList', value)
      }
    }
  },
  methods: {
    updateChildren(value, parentId) {
      this.$store.commit('updateChildren', {value, parentId})
    }
  }
};

</script>

<style scoped>

.childItem {
  display: flex;
  align-items: center;
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
  font-size: 13px;
  color: #000000;
  background: #FFFFFF;
  border: 1px solid #DFE4EF;
  cursor: grab;
}

.buttonBlock {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.actionButton {
  all: unset;
  height: 16px;
  width: 20px;
  cursor: pointer;
  margin-left: 20px;
  background-repeat: no-repeat;
  background-position: top center;
  background-clip: content-box;
}

.edit {
  background-image: url("/src/assets/edit.png");
}

.delete {
  background-image: url("/src/assets/delete.png");
}

.drag {
  background-image: url("/src/assets/dragArrow.png");
}

.blueDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00C2FF;
  margin-left: 20px;
}

.twoDots {
  width: 22px;
  height: 8px;
  margin-left: 20px;
  background-image: url('/src/assets/twoDots.png');
  background-repeat: no-repeat;
  background-position: center;
}

.greyLabel {
  font-weight: 400;
  font-size: 11px;
  color: #8E9CBB;
  margin-left: 15px;
}

.dragging {
  box-shadow: 0 3px 16px rgba(0, 102, 255, 0.7);
}
</style>