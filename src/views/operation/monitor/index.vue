<template>
  <div class="app-container monitor" v-if="!isLoading">
    <div class="monitor-title">
      <span class="monitor-title-text">在线用户数</span>
      <el-select v-model="serverNumber" placeholder="请选择">
        <el-option v-for="item in serversInfoArr" :key="item.serverNumber" :label="item.label" :value="item.serverNumber">
        </el-option>
      </el-select>
    </div>
    <div class="monitor-number">当前在线人数：<span>{{currentNumber}}</span></div>
    <div class="monitor-number">今日最高在线人数：<span>{{todayMaxOnlineNumber[0].max}}</span></div>
    <!-- <div class="monitor-number">今日注册人数：<span>123123123</span></div> -->
    <!-- <div class="monitor-number">今日登录人数：<span>123123123</span></div> -->
    <el-button class="monitor-export-btn" type="primary" @click="handleExport" :loading="downloadLoading">{{$t('export')}}</el-button>
    <div class="monitor-chart">
      <line-chart height="100%" width="100%" :timeAxis='timeAxis' :chartData='chartData' />
    </div>
  </div>
</template>

<script>
import lineChart from '@/components/Charts/lineMarker'
import _ from 'lodash'
import moment from 'moment'
import { Base64 } from 'js-base64'
import { i18n } from '@/i18n'
import monitorApi from '@/api/monitor'

export default {
  data() {
    return {
      serverNumber: 0,
      isLoading: true,
      currentOnlineNumber: {},
      maxOnlineNumber: {},
      todayMaxOnlineNumber: {},
      downloadLoading: false
    }
  },
  components: {
    lineChart
  },
  async created() {
    const today = moment().format('YYYY-MM-DD')
    const [online, maxOnline, todayMaxOnline] = await Promise.all([
      monitorApi.getCurrentOnlineNumber(),
      monitorApi.getMaxOnlineNumber({}),
      monitorApi.getMaxOnlineNumber({
        fromDate: today,
        toDate: today
      })
    ])
    this.currentOnlineNumber = online
    this.maxOnlineNumber = maxOnline
    this.todayMaxOnlineNumber = todayMaxOnline
    this.isLoading = false
  },
  computed: {
    currentNumber() {
      let number = 0
      switch (this.serverNumber) {
        case 0:
          return _.reduce(
            this.currentOnlineNumber,
            (count, cur) => count + cur.online_number,
            0
          )
        case 1:
          number = _.get(this.currentOnlineNumber[0], 'online_number', 0)
          break
        case 2:
          number = _.get(this.currentOnlineNumber[1], 'online_number', 0)
          break
        default:
          number = 0
      }
      return number
    },
    serversInfoArr() {
      const servers = _.map(this.currentOnlineNumber, (i, index) => ({
        serverNumber: index + 1,
        label: Base64.decode(i.ip) + '/' + i.port
      }))
      servers.unshift({ serverNumber: 0, label: '全服总和' })
      return servers
    },
    timeAxis() {
      const timeArr = []
      _.map(this.maxOnlineNumber, i => {
        const time = i.updatedAt
        const month = new Date(time).getMonth() + 1
        const date = new Date(time).getDate()
        const month_date = month + '-' + date
        timeArr.push(month_date)
      })
      return timeArr
    },
    chartData() {
      const dataArr = []
      _.map(this.maxOnlineNumber, i => {
        dataArr.push(i.max)
      })
      return dataArr
    }
  },
  methods: {
    handleExport() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = Object.keys(this.maxOnlineNumber[0])
        const tHeader_zh = tHeader.map(i => i18n.t(`monitor.${i}`))
        const data = this.maxOnlineNumber.map(row =>
          tHeader.map(key => this.rowValue(row, key))
        )
        excel.export_json_to_excel({
          header: tHeader_zh,
          data,
          filename: 'monitor-table-list'
        })
        this.downloadLoading = false
      })
    },
    rowValue(row, key) {
      if (key === 'ip') {
        return Base64.decode(_.get(row, key))
      } else if (key === 'updatedAt' || key === 'createdAt') {
        return moment(_.get(row, key)).format('YYYY-MM-DD HH:mm:ss')
      }
      return _.get(row, key)
    }
  }
}
</script>
<style lang="scss">
.monitor {
  &-title {
    height: 50px;
    display: flex;
    align-items: center;
    &-text {
      font-size: 30px;
      line-height: 50px;
      padding-right: 20px;
    }
  }
  &-number {
    padding: 10px 10px 0 0;
  }
  &-export-btn {
    margin: 20px 0 0;
  }
  &-chart {
    margin-top: 20px;
    width: 100%;
    height: calc(80vh - 130px);
  }
}
</style>

