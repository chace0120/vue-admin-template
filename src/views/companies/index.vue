<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="small">
      <el-form-item>
        <el-checkbox v-model="query.onlyHotels" label="Only hotels" />
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="query.onlyOpen" placeholder="Status">
          <el-option label="All" value="0" />
          <el-option label="Only for open" value="1" />
          <el-option label="Only for close" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.cpName" placeholder="search by name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="">Search</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="90">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="Name" width="200">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="Abbr." width="95">
        <template slot-scope="scope">{{ scope.row.abbrName }}</template>
      </el-table-column>
      <el-table-column label="Week's Start Day" width="150">
        <template slot-scope="scope">
          {{ scope.row.startDay | startDayFilter }}
          <el-tag v-if="scope.row.isHotel" size="mini">Hotel</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Desc">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="Timezone" width="150">
        <template slot-scope="scope">{{ scope.row.hotelTimezone }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.status | statusFilter"
          >{{ scope.row.status | mapStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Operation" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">View</el-button>
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            :type="scope.row.status | statusBtnFilter"
            @click="handleDelete(scope.$index, scope.row)"
          >{{ scope.row.status | mapStatusBtn }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/company'

export default {
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'danger'
    },
    mapStatus(status) {
      return status ? 'open' : 'close'
    },
    statusBtnFilter(status) {
      return status ? 'danger' : 'success'
    },
    mapStatusBtn(status) {
      return status ? 'Close' : 'Open'
    },
    startDayFilter(dow) {
      const dowMap = {
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
        7: 'Sun'
      }
      return dowMap[dow] || '--'
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      query: {
        cpName: '',
        onlyOpen: '0',
        onlyHotels: false
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
/* reset element-ui css */
.app-container {
  .el-checkbox__label {
    font-weight: 700;
  }
}
</style>
