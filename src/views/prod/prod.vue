<script>
import firebase from "firebase";

export default {
  name: "prod",
  data() {
    return {
      person_box: false,
      person_name: "",
      prods: [
        {
          productName: "超好用手機01",
          description:
            "由超好用手機前海外副總裁王曉明創立的全新手機品牌【Min】，正式發表了最新款的超好用手機 3 及手機殼產品。身為超好用手機手機的第三款產品，不僅將延續超好用手機 1 和超好用手機 2 的模式，還將進一步在性能、設計方面升級，為年輕消費者帶來不一樣的產品體驗。",
          imgs: ["product01", "product02"],
          priceDescription: "一臺",
          price: 12000
        },
        {
          productName: "超好用手機02",
          description:
            "由超好用手機前海外副總裁王曉明創立的全新手機品牌【Min】，正式發表了最新款的超好用手機 3 及手機殼產品。身為超好用手機手機的第三款產品，不僅將延續超好用手機 1 和超好用手機 2 的模式，還將進一步在性能、設計方面升級，為年輕消費者帶來不一樣的產品體驗。",
          imgs: ["product03", "product04"],
          priceDescription: "一臺",
          price: 8000
        }
      ]
    };
  },
  components: {},
  methods: {
    add_prod(index) {
      if (!window.localStorage) {
        this.$Message.error("無法加入");
        return;
      }

      const order = {
        productName: this.prods[index]["productName"],
        price: this.prods[index]["price"],
        name: this.$store.state.person_name,
        index: this.make_index()
      };

      if (!localStorage.getItem("person")) {
        // Add user's name
        this.person_box = true;
        // focus input
        this.$nextTick(() => this.$refs.name.focus());
      } else {
        // Add to order shopcart
        let new_order = JSON.parse(localStorage.getItem("order")) || [];
        if (new_order.length > 10) {
          this.$Message.error("您太貪心了!");
          return;
        }
        new_order.push(order);
        localStorage.setItem("order", JSON.stringify(new_order));
        this.$Message.success("加入成功");

        this.add_to_firebase(order);
      }
    },
    add_to_firebase(order) {
      this.$store.commit("ADD_ORDER", order); // update local data
      // update firebase data
      firebase
        .database()
        .ref(`/${this.$store.state.person_name}`)
        .update(this.$store.state.order);
    },
    ok() {
      if (this.person_name != "") {
        localStorage.setItem("person", this.person_name);
        this.$store.state.person_name = this.person_name;
      } else {
        this.$Message.error("不能為空，請再輸入一次。");
      }
    },
    cancel() {
      this.person_name = "";
    },
    make_index() {
      if (this.$store.state.order.length == 0) return 0;
      else return this.$store.state.order.length;
    }
  },
  mounted() {
    // get user's name from localStorage
    this.person_name = this.$store.state.person_name;
  }
};
</script>

<template src="./template.html"></template>

<style scoped lang="scss" src="./style.scss"></style>
