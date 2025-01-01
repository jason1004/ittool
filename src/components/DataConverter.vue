<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5">
        <div class="count-info">转换前总数：{{ rawCount }}</div>
        <textarea 
          v-model="rawData" 
          rows="30" 
          placeholder="一行一个"
          class="form-control">
        </textarea>
      </div>
      <div class="col-md-2 button-group">
        <div class="options-section">
          <div class="section-title">选项设置</div>
          <div class="options-content">
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                v-model="needUnique" 
                id="uniqueCheck"
              >
              <label class="form-check-label" for="uniqueCheck">
                去重
              </label>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="buttons-section">
          <button @click="convertToSqlIn" class="btn btn-primary">SQL IN</button>
          <button @click="convertToComma" class="btn btn-primary">逗号连接</button>
          <button @click="convertToArray" class="btn btn-primary">转换数组</button>
          <button @click="findDuplicates" class="btn btn-warning">查找重复</button>
          <button @click="reverseConvert" class="btn btn-danger">反向转换</button>
        </div>
      </div>
      <div class="col-md-5">
        <div class="count-info">转换后总数：{{ newCount }}</div>
        <textarea 
          v-model="newData" 
          rows="30" 
          placeholder="结果"
          class="form-control">
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataConverter',
  data() {
    return {
      rawData: '',
      newData: '',
      needUnique: true, // 默认选中去重
    }
  },
  computed: {
    rawCount() {
      return this.rawData
        ? this.rawData.split('\n').filter(item => item.trim()).length
        : 0
    },
    newCount() {
      if (!this.newData) return 0;
      // 根据不同的转换结果计算总数
      if (this.newData.includes('","')) {
        // 数组格式
        return this.newData.split('",\n"').length;
      } else if (this.newData.includes("','")) {
        // SQL IN 格式
        return this.newData.split("','").length;
      } else {
        // 逗号分隔格式
        return this.newData.split(',').length;
      }
    }
  },
  methods: {
    findDuplicates() {
      // 将输入按行分割并去除空行和首尾空格
      const lines = this.rawData
        .split('\n')
        .map(item => item.trim())
        .filter(item => item);
      
      // 使用Map统计每个项目出现的次数
      const countMap = new Map();
      lines.forEach(item => {
        countMap.set(item, (countMap.get(item) || 0) + 1);
      });
      
      // 找出重复的项目（出现次数大于1的）
      const duplicates = [];
      countMap.forEach((count, item) => {
        if (count > 1) {
          duplicates.push(`${item} (重复${count}次)`);
        }
      });
      
      // 如果没有重复项
      if (duplicates.length === 0) {
        this.newData = '没有找到重复项';
        return;
      }
      
      // 将重复项显示在右侧文本框中
      this.newData = duplicates.join('\n');
    },
    processData() {
      let arr = this.rawData
        .split('\n')
        .map(item => item.trim())
        .filter(item => item);
      
      // 如果需要去重
      if (this.needUnique) {
        arr = [...new Set(arr)];
      }
      
      return arr;
    },
    convertToSqlIn() {
      const arr = this.processData();
      this.newData = arr.join("','");
    },
    convertToComma() {
      const arr = this.processData();
      this.newData = arr.join(",");
    },
    convertToArray() {
      const arr = this.processData();
      const str = arr.join('",\n"');
      this.newData = str ? `"${str}"` : '';
    },
    reverseConvert() {
      this.rawData = this.newData.split(",").join("\n");
    }
  }
}
</script>

<style scoped>
textarea {
  border: 1px bisque double;
  width: 100%;
  margin-top: 20px;
  height: auto;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
}

.btn {
  width: 100px;
}

.count-info {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.form-check {
  text-align: left;
  width: 100px;
  margin: 0;
}

.form-check-input {
  cursor: pointer;
}

.form-check-label {
  cursor: pointer;
  user-select: none;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #000;
}

.btn-warning:hover {
  background-color: #ffca2c;
  border-color: #ffc720;
  color: #000;
}

.options-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  margin-bottom: 10px;
}

.section-title {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 10px;
  text-align: left;
  font-weight: 500;
}

.options-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #dee2e6;
  margin: 15px 0;
}

.buttons-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
}
</style> 