<script>
import firebase from "firebase";

export default {
  name: "order",
  data() {
    return {
      status: false,
      columns: [
        {
          title: "商品名稱",
          key: "productName",
          width: 200
        },
        {
          title: "價錢",
          key: "price"
        },
        {
          title: "狀態",
          slot: "action",
          align: "center"
        }
      ],
      oreders: []
    };
  },
  components: {},
  methods: {
    remove(index) {
      // delete
      this.oreders.splice(index, 1);
      // localStorage delete
      localStorage.setItem("order", JSON.stringify(this.oreders));
      // firebase delete
      const fi = this.$store.state.order[index]["index"];
      firebase
        .database()
        .ref(`/${this.$store.state.person_name}`)
        .child(fi)
        .remove();
      // vuex delete
      this.$store.state.order.splice(index, 1);
    },
    load() {
      if (!window.localStorage) return;
      this.oreders = JSON.parse(localStorage.getItem("order")) || [];
    }
  },
  mounted() {
    // get localStorage data
    this.load();
  }
};
</script>

<template src="./template.html"></template>

<style scoped lang="scss" src="./style.scss"></style>
