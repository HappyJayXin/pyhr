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
          productName: "粉玫瑰有機洗髮精",
          description:
            "純淨粉玫瑰精油與歐盟ECOCERT有機認證起泡成分，能潔淨毛燥受損秀髮，迷迭香萃取物有效收斂髮絲，草本精華提供頭髮和頭皮深層的保溼潤澤。",
          imgs: ["product01", "product02"],
          priceDescription: "一瓶+補充包",
          price: 1290
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
        price: this.prods[index]["price"]
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
    add_to_firebase({ productName, price }) {
      var obj = {
        name: this.$store.state.person_name,
        price: price,
        productname: productName,
        index: this.make_index()
      };
      this.$store.commit("ADD_ORDER", obj); // update local data
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
