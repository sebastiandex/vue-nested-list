<template>

  <div
      v-if="!parent.hidden"
      class="typeItem"
      v-on:dragover="openChildren(true)"
      v-on:dragleave="openChildren(false)"
  >
    <div style="display: flex; align-items: center">
      <button
        class="arrowButton"
        v-bind:class="{'rotate' : expanded}"
        v-on:click="expandToggle()"
    />
      <input
          v-if="editing"
          v-on:focusout="editToggle()"
          v-on:mouseout="editToggle()"
          class="parentInput"
          v-model="parent.name"
      >
      <div v-else>{{ parent.name }}</div>
    </div>
    <div v-if="parent.threeDots" class="threeDots" />
    <div v-if="parent.greyLabel" class="greyLabel">{{parent.greyLabel}}</div>
    <div class="buttonBlock">
      <button
          class="actionButton edit"
          v-on:click="editToggle()"
      />
      <button class="actionButton delete"/>
      <button class="actionButton drag"/>
    </div>
  </div>
  <transition-group
      name="staggered-fade"
      tag="div"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
  >
    <div
        v-if="expanded || parent.hidden"
        v-bind:class="{'marginLeft' : !parent.hidden, 'marginTop' : parent.hidden}"
    >
      <ChildComponent
          :parent="parent"
          :passed-data="parent.children"
          passed-group="children"
      />
    </div>
  </transition-group>
</template>

<script>
import ChildComponent from "@/components/ChildList";
import {gsap} from 'gsap';

export default {
  name: "ParentItem",
  components: {ChildComponent},
  props: ['passedData'],
  data() {
    return {
      editing: false,
      expanded: false
    };
  },
  computed: {
    parent: {
      get() {
        return this.passedData
      }
    }
  },
  methods: {
    openChildren(bool) {
      //Открываем категорию если она закрыта и над ней протаскивается документ
      if (!this.expanded && bool) {
        this.expanded = true;
      }
    },
    editToggle() {
      return this.editing = !this.editing
    },
    expandToggle() {
      return this.expanded = !this.expanded
    },
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: 'auto',
        delay: el.dataset.index,
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index,
        onComplete: done
      })
    }
  }
}
</script>

<style scoped>
.typeItem {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  padding: 0 15px;
  font-size: 15px;
  font-weight: 500;
  color: #000000;
  background: #FFFFFF;
  border: 1px solid #DFE4EF;
  cursor: grab;
  box-shadow: none;
}

.arrowButton {
  width: 20px;
  height: 20px;
  border: 1px solid #D3D8DF;
  margin-right: 15px;
  border-radius: 50px;
  background-image: url('/src/assets/blueArrow.png');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.buttonBlock {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.actionButton {
  all: unset;
  height: 18px;
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

.marginLeft {
  margin-left: 15px
}

.marginTop {
  margin-top: 15px;
}

.rotate {
  transform: rotate(180deg);
}

.threeDots {
  width: 36px;
  height: 8px;
  margin-left: 15px;
  background-image: url('/src/assets/threeDots.png');
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