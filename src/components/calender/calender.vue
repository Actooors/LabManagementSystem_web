<template>
  <div>
    <div id="rightPart2" class="box rightPart2">
      <div class="title2">日程<span class="today">今天</span></div>
      <div class="schedule">
        <div id="calendar" class="dateShow">
          <table id="dayshow" class="dates">
            <tr>
              <th>
                <button id="lastM" class="lastM" title="上一月"></button>
              </th>
              <th class="tl">
                <button id="last-week" class="lastW" title="上一周"></button>
              </th>
              <th id="curday" style="text-align:right" colspan="2">2017年3月19</th>
              <th>-</th>
              <th id="curday7" style="text-align:left" colspan="2">2017年3月25日</th>
              <th class="tr">
                <button id="next-week" class="nextW" title="下一周"></button>
              </th>
              <th>
                <button id="nextM" class="nextM" title="下一月"></button>
              </th>
            </tr>
            <tr>
              <td class="padleft" colspan="2">
                <button>日</button>
              </td>
              <td>
                <button>一</button>
              </td>
              <td>
                <button>二</button>
              </td>
              <td>
                <button>三</button>
              </td>
              <td>
                <button>四</button>
              </td>
              <td>
                <button>五</button>
              </td>
              <td class="padright" colspan="2">
                <button>六</button>
              </td>
            </tr>
            <tr id="monitor">
              <td class="padleft" colspan="2">
                <button>19</button>
              </td>
              <td>
                <button>20</button>
              </td>
              <td>
                <button>21</button>
              </td>
              <td>
                <button>22</button>
              </td>
              <td>
                <button>23</button>
              </td>
              <td>
                <button>24</button>
              </td>
              <td class="padright" colspan="2">
                <button>25</button>
              </td>
            </tr>
          </table>
        </div>
        <div class="detailed">
          <ul class="rclist">
            <li v-for="item in this.tasks"><span class="time">{{item.time}}</span><span
              class="explain">{{item.content}}</span></li>
          </ul>
          <!--<a class="downBtn" href="#" style="display:none;">显示更多</a>-->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import $ from "jquery"
  import DATE from "../../assets/js/date"
  import axios from 'axios'

  export default {
    name: "calender",
    data() {
      return {
        activeDay: '',
        tasks: [
          {
            time: '10:30',
            content: '我的日程表上已经排满了很多的事情'
          },
          {
            time: '11:30',
            content: '我抱怨我的日程表、我的家庭、我的处境和可能抱怨的一切，认为是它们让我陷入困境。'
          },
          {
            time: '12:30',
            content: '把每周回顾列入我的日程表中是我要做的第一步.'
          },
          {
            time: '13:30',
            content: '我一般在每周五下午做每周回顾.'
          },
          {
            time: '13:30',
            content: '我一般在每周五下午做每周回顾.'
          },
          {
            time: '14:30',
            content: '因为在周末之前让我感觉到一周就要结束了(应该总结一下了).'
          },
          {
            time: '15:30',
            content: '有些人习惯于周日晚上作回顾,这样在下周一时对刚刚总结过的事情印象比较深刻.'
          },
          {
            time: '16:30',
            content: '作好回顾的关键是把它列入日程表'
          }
        ]
      }
    },
    computed: {
      today() {
        var date = new Date();
        var today = date.getDate().toString();
        return today;
      }
    },
    created() {
      this.activeDay = this.today;
      // console.log(this.activeday)
    }
    ,
    mounted() {
      // $("#monitor td button").click(function(){
      //   $(this).addClass('mark1')
      //     .parent().siblings().children('button').removeClass('mark1');
      // });
      DATE();
      this.updateActiveday();
    },
    methods: {
      updateActiveday() {
        var buttons = document.getElementById('monitor').getElementsByTagName("button");
        // console.log(buttons)
        var vm = this;
        for (var i = 0; i < buttons.length; i++) {
          // console.log(buttons[i].innerHTML)
          buttons[i].addEventListener('click', function () {
            // console.log("旧值"+vm.activeDay);
            vm.activeDay = this.innerHTML;
            // console.log(buttons[i].innerHTML);
            // console.log(this);
            process.env.NODE_ENV === "development" && console.log(this.innerHTML)
            // console.log("新值"+vm.activeDay);
          })
        }
      },
      lodeTask() {
        var now = this.activeday;
        // 写成箭头就不用

        process.env.NODE_ENV === "development" && console.log("运行！！")
        axios({
          url: '//localhost:8989/api/calender',
          method: 'get',
          params: {
            now: now
          }
        })
          .then((response) => {
            if (response.data.code === "SUCCESS" && response.data.data != null) {
              this.tasks = response.data.data;
            }
          }).catch((error) => {
          process.env.NODE_ENV === "development" && console.log("获取信息失败")
        })
      }
    },
    watch: {
      activeDay(v, m) {
        process.env.NODE_ENV === "development" && console.log("新值" + v);
        process.env.NODE_ENV === "development" && console.log("旧值" + m)
        this.lodeTask();
      }
    }

  }
</script>
<style scoped>
  @import "../../assets/css/index.css";

</style>
