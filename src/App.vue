<template>
  <div>
    <header>
      <div class="layout">
        <ul>
          <li>
            <router-link :to="{ name: 'prod' }">
              <a href="javascript:;">PYHR</a>
            </router-link>
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
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "pyhr"
};
</script>

<style lang="scss">
@import "@/assets/_variable.scss";
.layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  width: 100%;
  background: $page_black;
  color: #fff;
  ul {
    margin: 0 2rem;
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
@media only screen and (max-width: 1000px) {
  .layout {
    ul {
      margin: 0 1rem;
      li {
        font-size: 1.5rem;
        margin: 0 0.5rem;
      }
    }
  }
}
</style>
