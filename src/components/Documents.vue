<template>
  <header class="head">
    <span class="headerLabel">Документы</span>
    <div style="display: flex">
      <button class="addFavouritesButton"/>
      <button class="addButton">Новый тип</button>
      <button class="addButton">Новый документ</button>
    </div>

  </header>
  <div class="searchContainer">
    <input
        v-model="this.filterValue"
        class="searchInput"
        type="text"
        placeholder="Поиск"
        v-on:keyup="filterList($event.target.value)"
    >
    <button
        v-if="this.filterValue"
        class="pinkCross"
        v-on:click="filterList('')"
    >
    </button>
  </div>
  <div>
    <transition-group
        name="staggered-fade"
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
    >
      <p class="greyLabel" v-if="isFiltered &&filteredArray.length === 0">
        Ничего не найдено. Попробуйте изменить параметры поиска.
      </p>
      <ListComponent
          v-else
          :passedData="passedData"
      />
    </transition-group>
  </div>
</template>

<script>
import ListComponent from "@/components/List";
import {gsap} from "gsap";

export default {
  name: 'DocumentsComponent',
  components: {ListComponent},
  data() {
    return {
      isFiltered: false,
      filterValue: '',
      filteredArray: []
    };
  },
  computed: {
    passedData: {
      get() {
        return this.isFiltered ? this.filteredArray : this.$store.state.list
      }
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: 'auto',
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        onComplete: done
      })
    },
    changeFilterValue(value) {
      this.filterValue = value;
      this.isFiltered = true;
    },
    filterList(value) {
      if (value === '') {
        this.isFiltered = false;
        this.filterValue = '';
      } else {
        this.changeFilterValue(value)
        const list = this.$store.state.list;
        let filteredArray = [];
        for (let i = 0; i < list.length; i++) {
          // Ищем совпадение в названии родительского элемента, и проверяем не является ли папка скрытой
          const matchParent = list[i].name.toLowerCase().search(this.filterValue.toLowerCase()) !== -1;
          let matchChildren = false;
          list[i].children.forEach((item) => {
            // Если есть совпадение в детях то показываем родителя
            if (item.name.toLowerCase().search(this.filterValue.toLowerCase()) !== -1) {
              matchChildren = true;
            }
          });
          if (matchParent || matchChildren) {
            const filteredParent = Object.assign({}, list[i]);
            const children = [];
            filteredParent.children.forEach((item) => {
              // фильтруем детей
              if (item.name.toLowerCase().search(this.filterValue.toLowerCase()) !== -1) {
                children.push(Object.assign({}, item))
              }
            });
            filteredParent.children = children;
            filteredArray.push(filteredParent)
          }
        }
        this.filteredArray = filteredArray
      }
    }
  }

}
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.headerLabel {
  color: #000000;
  font-size: 22px;
  font-weight: 500;
}

.searchContainer {
  display: flex;
  max-width: 564px;
  height: 30px;
  border-bottom: 1px solid #BFC9E0;
  margin-bottom: 20px;
}

.searchInput {
  height: 17px;
  font-size: 15px;
  padding: 0 25px;
  width: 90%;
  background-image: url('/src/assets/searchIcon.png');
  background-repeat: no-repeat;
  background-position: left center;
  border: none;
}

.searchInput::placeholder {
  font-style: italic;
  color: #8E9CBB;
}

.searchInput:focus {
  outline: none
}

.greyLabel {
  margin-top: 35px;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  color: #8E9CBB;
}

.pinkCross {
  all: unset;
  height: 20px;
  width: 30px;
  background-image: url('/src/assets/pinkCross.png');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.addButton {
  all: unset;
  height: 28px;
  padding: 0 15px 0 30px;
  margin-left: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #000000;
  border: 1px solid #D3D8DF;
  border-radius: 50px;
  background-image: url('/src/assets/bluePlus.png');
  background-repeat: no-repeat;
  background-position: 8px;
  cursor: pointer;
}

.addFavouritesButton {
  all: unset;
  height: 28px;
  width: 28px;
  border: 1px solid #D3D8DF;
  border-radius: 50px;
  background-image: url('/src/assets/favourites.png');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

</style>
