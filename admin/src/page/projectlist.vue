<template>
    <div>
        <!-- 项目列表 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
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
                    <el-button type="primary" size="mini" @click="imgManage">图片管理</el-button>
                    <el-button type="primary" size="mini" @click="editItem()">修改</el-button>
                    <el-button type="warning" size="mini" @click="delProject()">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 图片管理 -->
        <el-dialog
            title="图片管理"
            :visible.sync="dialogVisible">
            <div>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
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
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="项目名称">
                        <el-input
                        placeholder="请输入项目名称" 
                        v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="项目介绍">
                        <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="请输入内容"
                        v-model="textarea">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [{
                id: 1,
                title: '花园小屋的故事',
                introduce: 'fdsfdsfasfsfdsds'
            },{
                id: 1,
                title: '花园小屋的故事',
                introduce: 'fdsfdsfasfsfdsds'
            },{
                id: 1,
                title: '花园小屋的故事',
                introduce: 'fdsfdsfasfsfdsds'
            }],
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            dialogVisible: false,
            editDialogVisible: false,
            dialogImageUrl: '',
            form: {
                title: ''
            }
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
        delProject(id) {
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });      
            });
        },
        editItem(id) {
            this.editDialogVisible = true;
        }
    }
}
</script>
<style lang="scss" scoped>
    .img-content {
        width: 100px;
        height: 100px;
        background: #ddd;
    }
</style>


