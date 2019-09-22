<template>
  <div class="searchbar">
    <div class="container">
      <div class="search-left">
        <div class="swiper-wrapper"></div>
      </div>
      <div class="search-middle">
        <input
          class="search-input"
          autocomplete="off"
          spellcheck="false"
          aria-expanded="false"
          tabindex="1"
          placeholder="关键字"
          data-default
        />
        <button type="button" class="search-btn">
          <span class="iconfont">&#xe61d;</span>
          <i class="s-ico"></i>搜索
        </button>
      </div>
      <div class="search-right">
        <span class="login" id="toploginreg">
          <i id="log-btn" class="log-btn">登录</i>
        </span>
        <span class="login">
          <i id="log-btn" class="reg-btn">注册</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSearch'
}
</script>

 <style lang="stylus" scoped>
 .searchbar {
   position: relative;
   padding-top: 10px;
   padding-bottom: 50px;
   display: block !important;
   background-color: #f8f8f8;
   padding-left: 0;
   padding-right: 0;
   zoom: 1;

   .container {
     padding-left: 0;
     padding-right: 0;
     min-width: 1160px;
     max-width: 1160px;
     margin: 0 auto;

     .search-left {
       padding-left: 10px;
       margin-left: auto;
       margin-right: auto;
       position: relative;
       overflow: hidden;
       z-index: 1;
       font-size: 18px;
       height: 42px;
       width: 290px;
       float: left;

       .swiper-wrapper {
         width: 100%;
         height: 100%;
         position: relative;
       }
     }

     .search-middle {
       padding-left: 30px;
       float: left;

       .search-input {
         font-size: 20px;
         float: left;
         width: 480px;
         height: 50px;
         border: 1px solid #d7d7d7;
         text-indent: 12px;
         background: #fff;
       }

       .search-btn {
         color: #fff;
         font-size: 20px;
         float: left;
         background: #29affc;
         height: 50px;
         width: 115px;

         .s-ico {
           width: 20px;
           height: 24px;
           margin-right: 3px;
           margin-left: 3px;
           background-position: -328px -78px;
         }
       }
     }

     .search-right {
       padding-top: 5px;
       margin-right: 40px;
       float: right;
       font-size: 20px;

       .login {
         display: inline-block;

         .log-btn {
           color: #fff;
           margin-right: 10px;
           cursor: pointer;
           background: #f60;
           display: inline-block;
           border-radius: 3px;
           padding: 0 14px;
           height: 40px;
           line-height: 40px;
           width: 70px;
           font-style: normal;
         }

         .reg-btn {
           border: 1px solid #f60;
           color: #f60;
           display: inline-block;
           border-radius: 3px;
           padding: 0 14px;
           height: 40px;
           line-height: 40px;
           width: 70px;
           font-style: normal;
         }
       }
     }
   }
 }
</style>
