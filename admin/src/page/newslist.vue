<template>
    <div>
        <el-table
            :data="tableData"
            border
            stripe
            v-loading="tableLoading"
            style="width: 100%">
            <el-table-column
            prop="title"
            label="新闻标题">
            </el-table-column>
            <el-table-column
            prop="addtime"
            label="更新时间"
            width="180">
            </el-table-column>
            <el-table-column
            label="操作"
            width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleDetailNews(scope.row)">详细</el-button>
                    <!-- <el-button type="primary" size="mini" >修改</el-button> -->
                    <el-button type="warning" size="mini" @click="handleDelNews(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新闻详细框 -->
        <el-dialog
            :title="targetTitle"
            width="70%"
            :visible.sync="DialogVisible">
            <div class="detail-time">{{targetTime}}</div>
            <div id="newsContentRef" v-html="targetContent">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DialogVisible = false">确 定</el-button>
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
            DialogVisible: false,
            newsForm: {
                title: '',
                content: ''
            },
            targetContent:'',
            targetTitle: '新闻详情',
            targetTime: ''

        }
    },
    methods: {
        queryTableData() {
            this.tableLoading = true;
            this._fetch('http://192.168.1.102/admin/newslist.php', 'POST')
                .then((res)=> {
                    this.tableData = res.data.reverse();
                    this.tableLoading = false;
                })
                .catch(()=> {
                    this.$message.error('数据加载失败');
                    this.tableLoading = false;
                })
        },
        handleDelNews(item) {
            this.$confirm('此操作将永久删除该条新闻, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this._fetch('http://192.168.1.102/admin/news.php?action=del', 'POST', {id: item.id})
                    .then((res)=> {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.queryTableData();

                    })
                    .catch((err)=> {
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });  
                    })
                
            }).catch(() => {});
        },
        handleDetailNews(item) {
            this.targetContent = item.content;
            this.targetTitle = item.title;
            this.targetTime = item.addtime;
            this.DialogVisible = true;
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
<style lang="scss">
    .el-dialog__body {
        img {
            max-width: 100%;
        }
    }
    .detail-time {
        padding-bottom: 20px;
        color: #666;
        font-size: 12px;
    }
    .el-dialog__body {
        padding-top: 10px;
    }
</style>


