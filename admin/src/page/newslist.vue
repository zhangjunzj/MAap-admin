<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="title"
            label="新闻标题"
            width="180">
            </el-table-column>
            <el-table-column
            prop="introduce"
            label="新闻介绍">
            </el-table-column>
            <el-table-column
            prop="addtime"
            label="更新时间"
            width="160">
            </el-table-column>
            <el-table-column
            label="操作"
            width="180px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" >修改</el-button>
                    <el-button type="warning" size="mini" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新闻模态框 -->
        <el-dialog
            title="新闻详情／修改"
            :visible.sync="editDialogVisible">
            <div>
                <el-form ref="form" :model="newsForm" label-width="80px">
                    <el-form-item label="新闻标题">
                        <el-input
                        placeholder="请输入新闻标题" 
                        v-model="newsForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻内容">
                        <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="请输入内容"
                        v-model="newsForm.introduce">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editItem">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            tableLoading: true,
            editDialogVisible: false,
            newsForm: {
                title: '',
                introduce: ''
            }

        }
    },
    methods: {
        queryTableData() {
            this.tableLoading = true;
            this._fetch('http://192.168.1.102/admin/newslist.php', 'POST')
                .then((res)=> {
                    this.tableData = res.data;
                    this.tableLoading = false;
                })
                .catch(()=> {
                    this.$message.error('数据加载失败');
                    this.tableLoading = false;
                })
        },
        _fetch(url, method = 'POST', params) {
            return new Promise((resolve, reject)=> {
                fetch(url, {
                    method: method,
                    body: new URLSearchParams(params).toString(),
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                })
                .then((res)=>{
                    return res.text();
                })
                .then((res)=> {
                    resolve(JSON.parse(res));
                    return res;
                })
                .catch((err)=> {
                    reject(err);
                })
            });
        }
    },
    mounted () {
        this.queryTableData();
    }
}
</script>
<style lang="scss" scoped>

</style>


