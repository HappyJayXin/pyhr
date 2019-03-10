<template>
  <div id="app">
    <Layout>
      <transition name>
        <Header class="layout" breakpoint="md" v-if="show">
          <ul>
            <li>
              <a href="javascript:;">PYHR</a>
            </li>
          </ul>
          <ul>
            <li>
              <router-link :to="{ name: 'prod' }">
                <a href="javascript:;">商品</a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'order' }">
                <a href="javascript:;">我的訂單</a>
              </router-link>
            </li>
          </ul>
        </Header>
      </transition>
      <transition name="fadeDown" leave-active-class>
        <Header class="layout" breakpoint="md" v-if="!show">
          <ul>
            <li>
              <a href="javascript:;">PYHR</a>
            </li>
          </ul>
          <ul>
            <li>
              <router-link :to="{ name: 'prod' }">
                <a href="javascript:;">商品</a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'order' }">
                <a href="javascript:;">我的訂單</a>
              </router-link>
            </li>
          </ul>
        </Header>
      </transition>
      <Content>
        <router-view></router-view>
      </Content>
      <Footer class="footer">
        <div>Copyright ©2019 by Xin-Gyu</div>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "pyhr",
  data() {
    return {
      show: true
    };
  },
  mounted() {
    // get user's name from localStorage
    this.$store.state.person_name = localStorage.getItem("person") || "";

    window.addEventListener("scroll", () => {
      const layout = document.querySelector(".layout");
      if (window.pageYOffset > 80) {
        this.show = false;
        layout.style.position = "fixed";
      } else {
        this.show = true;
        layout.style.position = "static";
      }
    });

    // Load all data from firebase
    var getFire = new Promise(reslove => {
      firebase
        .database()
        .ref(localStorage.getItem("person"))
        .on("value", function(snapshot) {
          if (!snapshot.val()) return;
          reslove(snapshot.val());
        });
    });

    getFire.then(val => {
      this.$store.state.order = val;
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/_variable.scss";

html,
body {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.layout {
  position: static;
  top: 0px;
  left: 0px;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  width: 100%;
  background: $page_black !important;
  color: #fff;
  ul {
    li {
      display: inline;
      font-size: 2rem;
      margin: 0 1rem;
      a {
        color: #fff;
      }
    }
  }
}
.footer {
  background: $page_black !important;
  color: #fff !important;
  text-align: center;
}
.router-link-exact-active {
  position: relative;
  &::after {
    position: absolute;
    bottom: 0px;
    left: 0;
    background: #fff;
    content: "";
    height: 1px;
    width: 100%;
  }
}
@media only screen and (max-width: 1000px) {
  .ivu-layout-header {
    padding: 0 20px !important;
  }
  .layout {
    ul {
      li {
        font-size: 1.5rem;
        margin: 0 0.5rem;
      }
    }
  }
}
</style>
