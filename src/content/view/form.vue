<template>
    <el-dialog title="翻译" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="待翻译词典" :label-width="formLabelWidth">
                <el-input v-model="form.chinese"></el-input>
            </el-form-item>
            <el-form-item label="翻译词典" :label-width="formLabelWidth">
                <el-input v-model="form.english"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {Dialog, Button, Form, FormItem, Input} from 'element-ui';

export default {
    components: {
        ElDialog: Dialog,
        ElButton: Button,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input
    },

    data () {
        return {
            dialogFormVisible: false,
            form: {
                chinese: '',
                english: ''
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        submit () {
            this.dialogFormVisible = false;
            this.$emit('submit', this.form);
        },
        open (string) {
            this.form.chinese = string;
            this.form.english = '';
            this.dialogFormVisible = true;
        }
    }
}
</script>

<style>

</style>