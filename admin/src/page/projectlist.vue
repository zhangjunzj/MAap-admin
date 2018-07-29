<template>
    <div class="items-container">
        <!-- 项目列表 -->
        <el-table
            :data="tableData"
            border
            stripe
            v-loading="tableLoading"
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            width="60">
            </el-table-column>
            <el-table-column
            prop="title"
            label="项目名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="introduce"
            label="项目介绍">
            </el-table-column>
            <el-table-column
            label="操作"
            width="260px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="imgManage(scope.row)">图片管理</el-button>
                    <el-button type="primary" size="mini" @click="openEditModel(scope.row)">修改</el-button>
                    <el-button type="warning" size="mini" @click="delItem(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 图片管理 -->
        <el-dialog
            title="图片管理"
            :visible.sync="dialogVisible">
            <div>
                <el-upload
                    action="http://192.168.1.109/admin/item.php?action=imgadd"
                    list-type="picture-card"
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 项目修改 -->
        <el-dialog
            title="项目详情／修改"
            :visible.sync="editDialogVisible">
            <div>
                <el-form ref="form" :model="itemForm" label-width="80px">
                    <el-form-item label="项目名称">
                        <el-input
                        placeholder="请输入项目名称" 
                        v-model="itemForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="项目介绍">
                        <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="请输入内容"
                        v-model="itemForm.introduce">
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
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            dialogVisible: false,
            editDialogVisible: false,
            dialogImageUrl: '',
            itemForm: {
                id: '',
                title: '',
                introduce: ''
            },
            tableLoading: true
        }
    },
    methods: {
        imgManage() {
            this.dialogVisible = true;
        },
        handlePictureCardPreview() {

        },
        handleRemove() {

        },
        // 删除
        delItem(item) {
            console.log(item.id);
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this._fetch('http://192.168.1.109/admin/item.php?action=del', 'POST', {id: item.id})
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
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });      
            });
        },
        // 打开修改模态框
        openEditModel(item) {
            this.editDialogVisible = true;
            let {id, title, introduce } = item;
            this.itemForm = {id, title, introduce };
        },
        // 修改
        editItem () {
            let params = Object.assign({}, this.itemForm, {id: this.itemForm.id*1})
            this._fetch('http://192.168.1.109/admin/item.php?action=edit', 'POST', params)
                .then((res)=> {
                    console.log(res);
                    if (res.code === 1) {
                        this.$message.success('修改成功!');
                        this.editDialogVisible = false;
                        this.queryTableData();
                    } else {
                        this.$message.error('修改失败!');
                    }
                    
                })
                .catch((res)=> {
                    this.$message.error('修改失败!');
                })
        },
        queryTableData() {
            this.tableLoading = true;
            this._fetch('http://192.168.1.109/admin/itemlist.php', 'POST', {test:123})
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
<style lang="scss">
    .img-content {
        width: 100px;
        height: 100px;
        background: #ddd;
    }
    .items-container {
        .bread-menu {
            margin-bottom: 30px;
        }
        .el-table {
            .cell {
                white-space: nowrap;
            }
        }
    }
    
</style>


