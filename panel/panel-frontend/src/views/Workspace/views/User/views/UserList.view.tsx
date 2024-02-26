import { Component, Vue } from 'vue-facing-decorator'
import { UserListSchema, type UserList } from './validator/UserList.validator'
import { NAvatar, NDataTable, NH1, NTag } from 'naive-ui'
import type { TableColumns } from 'naive-ui/es/data-table/src/interface'

@Component({
  render(this: UserDashboardView) {
    const columns: TableColumns<UserList> = [
      {
        title: '用户ID',
        key: 'userID',
        width: 80,
        render(rowData) {
          return rowData.userID
        }
      },
      {
        title: '用户名',
        key: 'username',
        minWidth: 100,
        fixed: 'left',
        render(rowData) {
          return (
            <>
              {rowData.avatar ? (
                <>
                  <NAvatar src={rowData.avatar} size={24} />
                  {rowData.username}
                </>
              ) : (
                <div class="flex gap2 items-center">
                  <NAvatar size={24}>{rowData.username.charAt(1)}</NAvatar>
                  {rowData.username}
                </div>
              )}
            </>
          )
        }
      },
      {
        title: '创建时间',
        key: 'createdAt',
        minWidth: 180,
        sorter(row1, row2) {
          return new Date(row1.createdAt).getTime() - new Date(row2.createdAt).getTime()
        },
        render(rowData) {
          return <>{new Date(rowData.createdAt).toLocaleString()}</>
        }
      },
      {
        title: '资料更新时间',
        key: 'updatedAt',
        minWidth: 180,
        sorter(row1, row2) {
          return new Date(row1.updatedAt).getTime() - new Date(row2.updatedAt).getTime()
        },
        render(rowData) {
          return <>{new Date(rowData.createdAt).toLocaleString()}</>
        }
      },
      {
        title: 'IP',
        key: 'ip',
        minWidth: 180
      },
      {
        title: '个性签名',
        key: 'saying',
        minWidth: 200
      },
      {
        title: '邮箱',
        key: 'email',
        minWidth: 150
      },
      {
        title: '手机',
        key: 'phone',
        minWidth: 150
      },
      {
        title: '注销状态',
        key: 'isDeleted',
        minWidth: 85,
        render(rowData) {
          return <>{rowData.isDeleted ? '是' : '否'}</>
        }
      },
      {
        title: '余额',
        key: 'balance',
        minWidth: 100,
        sorter(row1, row2) {
          return (row1.balance || 0) - (row2.balance || 0)
        },
        render(rowData) {
          return <>{rowData.balance ? rowData.balance.toFixed(2) : 0}</>
        }
      },
      {
        title: '角色ID',
        key: 'roleIDs',
        render(rowData) {
          return (
            <>
              {rowData.roleIDs.map((roleID) => {
                return <NTag>{roleID}</NTag>
              })}
            </>
          )
        }
      }
    ]

    return (
      <div>
        <NH1>用户列表</NH1>
        <NDataTable striped scrollX={1000} columns={columns} data={this.userList} />
      </div>
    )
  }
})
export default class UserDashboardView extends Vue {
  public userList: UserList[] = []

  public async mounted() {
    const { data } = await usePassport.get('/user')
    const parsedData = UserListSchema.parse(data)
    this.userList = parsedData.data.users
  }
}
