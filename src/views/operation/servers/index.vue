<template>
  <div class="app-container servers" v-if="!listLoading">
    <h3>全部有效服务器</h3>
    <div class="all-servers">
      <el-table :data="all_servers" border>
      <el-table-column align="center" v-for="(title,index) in titles(all_servers[0])" :key="index" :prop="title" :label="title" :width="title.width">
        <template slot-scope="scope">
          <span>{{rowValue(scope.row, title)}}</span>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <h3>全部online信息</h3>
    <div class="online">
      <el-table :data="online" border>
      <el-table-column align="center" v-for="(title,index) in titles(online[0])" :key="index" :prop="title" :label="title" :width="title.width">
        <template slot-scope="scope">
          <span>{{rowValue(scope.row, title)}}</span>
        </template>
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import CRUDTable from '@/components/BaseCRUD/table'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import { Base64 } from 'js-base64'

export default {
  name: 'Servers',
  data() {
    return {
      listLoading: true
    }
  },
  components: {
    'crud-table': CRUDTable
  },
  async created() {
    await this.getServersInfo()
    this.listLoading = false
  },
  computed: {
    ...mapGetters({
      all_servers: 'all_servers',
      online: 'online'
    })
  },
  methods: {
    ...mapActions({
      getServersInfo: 'getServersInfo'
    }),
    titles(obj) {
      const arrKeys = _.keys(obj)
      return arrKeys
    },
    rowValue(row, key) {
      if (key === 'ip') {
        return Base64.decode(_.get(row, key))
      }
      return _.get(row, key)
    }
  }
}
</script>
<style lang="scss">
.servers{
  .all-servers{
    padding-bottom: 40px;
  }
}
</style>

