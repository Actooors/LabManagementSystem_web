<template>
  <div>
    <div class="container content" id="footer">
      <div class="row center">
        <div class="col-md-4 hidden-sm hidden-xs">
          <img src="../../assets/img/shu.jpg"/>
        </div>
        <div class="col-md-8 hidden-sm hidden-xs ">
          <p>
            <a target="_blank" href="http://www.ces.shu.edu.cn/Default.aspx">
              School of Computer Engineering and Science Shanghai University
            </a>
          </p>
          <p>
            <a target="_blank" href="http://www.shu.edu.cn/">
              Shanghai University
            </a>
          </p>
          <p>
            <a target="_blank"
               href="http://www.miibeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=HBwuIZCVLtUvqKl6FXojRs8KnQ3LLkVujIgVLwQjvZf99QO9dyXc!-736616813">
              沪ICP备09014157
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footerBar"
  }
</script>

<style scoped>
  #footer {
    margin: 0px auto 0 auto;
    text-align: center;
    height: 180px;
    width: 85%;
    left: 0;
    right: 0;
    /*bottom: 0px;*/
    /*border-top: 1px solid gray;*/
    position: absolute;
    padding-top: 10px;
  }

  a {
    display: block;
    text-decoration: none;
    text-align: right;
    padding-right: 20%;
    font-family: "Microsoft New Tai Lue";
    font-size: 15px;
    font-weight: bold;
    color: gray;
  }

  img {
    max-height: 150px;
  }

  .center {
    display: flex;
    align-items: center;
  }

  p:last-child {
    margin-bottom: 0px;
  }

</style>

