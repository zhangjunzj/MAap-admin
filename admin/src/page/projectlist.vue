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
            width="60%"
            :title="targetTitle"
            :visible.sync="dialogVisible"
            @closed="imgModalcloseHandler">
            <div>
                <el-upload
                    :action="imgUpoadUrl"
                    list-type="picture-card"
                    ref="imgUpload"
                    
                    :data="payload"
                    :disabled="false"
                    :limit="5"
                    :on-exceed="onExceed"
                    :file-list="fileList"
                    :before-upload="handleimgBeforeUpload"
                    :on-preview="handlePictureCardPreview"
                    :before-remove="handleimgBeforeRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            width="70%"
            title="查看大图"
            top="10vh"
            :visible.sync="viewImgDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
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
            fileList: [],
            dialogVisible: false,
            editDialogVisible: false,
            dialogImageUrl: '',
            itemForm: {
                id: '',
                title: '',
                introduce: ''
            },
            tableLoading: true,
            payload: { // 图片上传参数
                targetId: null
            },
            targetTitle: '图片管理',
            imgCheckFlag: true,
            viewImgDialogVisible: false,
            dialogImageUrl: ''

        }
    },
    computed: {
        imgUpoadUrl () {
            return (baseUrl + 'item.php?action=imgadd');
        }
    },
    methods: {
        // 打开图片管理模态框
        imgManage(item) {
            this.$Http('item.php?action=queryitemimg', 'POST', {itemId: item.id})
                .then((res)=> {
                    if (res.code === 1) {
                        res.data && res.data.map((val, key)=> {
                            val.url = 'http://192.168.1.102/admin/' + val.url;
                            return val;
                        });
                        this.fileList = res.data;
                        this.dialogVisible = true;
                    } else {
                        this.$message.warning('图片加载失败');
                    }
                    
                })
                .catch((err)=> {
                    this.$message({
                        type: 'info',
                        message: '查询失败'
                    });  
                })
            this.targetTitle = `项目图片 - ${item.title}`;
            this.payload.targetId = item.id;
            
            
        },
        // 关闭图片弹框时重置图片列表
        imgModalcloseHandler() {
            this.$refs.imgUpload.clearFiles();
            this.fileList = [];
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.viewImgDialogVisible = true;
        },
        // 图片上传前校验图片大小
        handleimgBeforeUpload(file) {
            if (file.size/1024/1024 > 2.5) {
                this.imgCheckFlag = false;
                this.$message.warning('图片大小超过限制，最大2.4M');
                return false;
            }
            this.imgCheckFlag = true;
            
        },
        // 删除图片
        handleimgBeforeRemove(file, fileList) {
            if (this.imgCheckFlag) {
                this.$Http('item.php?action=delimg', 'POST', {id: file.name})
                    .then((res)=> {
                        if (res.code === 1) {
                            this.$message.success('图片删除成功');
                        } else {
                            this.$message.warning('图片删除失败');
                        }
                        
                    })
                    .catch((err)=> {
                        this.$message.warning('图片删除失败');
                    })
            }
        },
        onExceed(files, fileList) {
            this.$message.warning('图片数量超过限制，最多上传5张呢');
        },
        // 删除
        delItem(item) {
            console.log(item.id);
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$Http('item.php?action=del', 'POST', {id: item.id})
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
            this.$Http('item.php?action=edit', 'POST', params)
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
            this.$Http('itemlist.php', 'POST', {test:123})
                .then((res)=> {
                    this.tableData = res.data.reverse();
                    this.tableLoading = false;
                })
                .catch(()=> {
                    this.$message.error('数据加载失败');
                    this.tableLoading = false;
                })
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


