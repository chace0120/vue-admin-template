<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small" label-position="top">
      <el-form-item label="Company Name" required>
        <el-input v-model="form.cpName" />
      </el-form-item>
      <el-form-item label="Abbr." required>
        <el-input v-model="form.abbr" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Week's Start Day" required>
            <el-select v-model="form.startDay">
              <el-option label="Mon" value="1" />
              <el-option label="Tue" value="2" />
              <el-option label="Wed" value="3" />
              <el-option label="Thu" value="4" />
              <el-option label="Fri" value="5" />
              <el-option label="Sat" value="6" />
              <el-option label="Sun" value="7" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Timezone" required>
            <el-select v-model="form.timezone">
              <el-option label="(GMT -04:00) America/New_York" value="America/New_York" />
              <el-option label="(GMT -04:00) EST5EDT" value="EST5EDT" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Desc.">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.isHotel" label="is Hotel?" />
      </el-form-item>
      <el-form-item style="text-align:center;">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cpName: '',
        abbr: '',
        startDay: '1',
        timezone: 'America/New_York',
        desc: '',
        isHotel: false
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  margin: 0 auto;
  width: 520px;
  overflow: hidden;
}
</style>
