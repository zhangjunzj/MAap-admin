<template>
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
        label="新闻图标"
        width="180">
        </el-table-column>
        <el-table-column
        prop="introduce"
        label="新闻介绍">
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
</template>
<script>
export default {
    data () {
        return {
            tableData: [{
                id: 1,
                title: '花园小屋的故事',
                icon: './1.png',
                date: '2018/07/21',
                introduce: 'fdsfdsfasfsfdsds'
            },{
                id: 1,
                title: '花园小屋的故事',
                icon: './1.png',
                date: '2018/07/21',
                introduce: 'fdsfdsfasfsfdsds'
            },{
                id: 1,
                title: '花园小屋的故事',
                icon: './1.png',
                date: '2018/07/21',
                introduce: 'fdsfdsfasfsfdsds'
            }]
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


