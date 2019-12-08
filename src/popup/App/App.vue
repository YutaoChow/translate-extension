<template>
 <el-card class="box-card">
      <div slot="header" class="clearfix"> 
        <span>翻译数据</span>
      </div>
      <textarea class="translate-data" v-model="data" placeholder="将已经翻译的数据保存"/>
      <div class="buttons">
        <el-button @click="refresh" type="text">刷新</el-button>
        <el-button @click="save" type="text">保存</el-button>
        <el-button v-if="isOpen" @click="close" type="text">关闭翻译</el-button>
        <el-button v-else @click="open" type="text">开启翻译</el-button>
      </div>
      <p v-if="confirm" class="confirm-text">设置成功，请刷新页面!</p>
 </el-card>
</template>

<script>
 export default {
    name: 'app',
    data () {
      return {
        data: '',
        isOpen: true,
        confirm: false
      }
    },
    mounted() {
        this.refreshData()
    },
    methods: {
        refreshData () {
            let vm = this;
            chrome.storage.sync.get(
                { 
                    translateData: '{}',
                    translateState: 'open' 
                }, 
                function(items) { 
                    vm.data = JSON.stringify(JSON.parse(items.translateData),null,4) ;
                    vm.isOpen = items.translateState === 'open';
                    console.log('初始化数据');
                }
            );
        },
        refresh () {
            chrome.storage.sync.get(
                { translateData: '' }, 
                function(items) { 
                    this.data = items.translateData;
                    console.log(items);
                }
            );
        },
        save () {
            let vm = this;
            chrome.storage.sync.set(
                { translateData: this.data }, 
                function() { 
                    vm.confirm = true;
                    console.log('保存成功')
                }
            );
        },
        open () {
            let vm = this;
            chrome.storage.sync.set(
                { translateState: 'open' }, 
                function() {
                    vm.confirm = true;
                    vm.isOpen = true; 
                    console.log('保存成功')
                }
            );
        },
        close () {
            let vm = this;
            chrome.storage.sync.set(
                { translateState: 'close' }, 
                function() { 
                    vm.confirm = true;
                    vm.isOpen = false;
                    console.log('保存成功')
                }
            );
        }
    }
 }
</script> 
<style>
 .box-card {
    width: 600px;
 }
 .translate-data {
    width: 550px;
    height: 400px;
 }
 .confirm-text {
    color:red;
 }
</style>
