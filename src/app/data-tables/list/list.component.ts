import { Component, OnInit, Inject } from '@angular/core'
import { TableService } from '../data-tables.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { FormBuilder } from '@angular/forms';
import { DataTable, TableDetail } from '../interface'


const tableTypes: object = {
  userTable: [
    {name: 'username', type: 'String', defaultValue: '', contact: ''},
    {name: 'password', type: 'String', defaultValue: '123456', contact: ''},
    {name: 'phone', type: 'String', defaultValue: '', contact: ''},
    {name: 'vip', type: 'Number', defaultValue: 0, contact: ''},
  ],
  articleTable: [
    {name: 'title', type: 'String', defaultValue: '', contact: ''},
    {name: 'auth', type: 'String', defaultValue: '', contact: ''},
    {name: 'content', type: 'String', defaultValue: '', contact: ''},
    {name: 'category', type: 'String', defaultValue: '', contact: ''},
    {name: 'cdt', type: 'String', defaultValue: '', contact: ''},
  ],
  commodityTable: [
    {name: 'gname', type: 'String', defaultValue: '', contact: ''},
    {name: 'desc', type: 'String', defaultValue: '', contact: ''},
    {name: 'price', type: 'Number', defaultValue: '', contact: ''},
    {name: 'cdt', type: 'String', defaultValue: '', contact: ''},
  ]
}
  
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers:[TableService]
})
export class ListComponent implements OnInit {

  tableList: DataTable[]
  tableListColumns: string[] = ['name', 'type', 'counts', 'letters', 'api', 'operate'];    

  constructor(
    private tableService: TableService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTables()
  }

  getTables(): void {
    this.tableService.getTablesInfo() 
    .subscribe( data => {
      this.tableList = data
      console.log(this.tableList)
    })    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTableDialog, {
      width:'80%',      
      data:{

      }
    })
  }
};

// 下面为弹框Dialog组件
@Component({
  selector: 'add-table-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./list.component.styl'],
})
export class AddTableDialog {

  tableBasicInfo = {
    name:'',
    name_zh:'',
    ttype:'custom'
  }
  tableDetailDatas = [{name: '', type: 'String', defaultValue: '', contact: ''}] 
  tableDetailColumns: string[] = ['name', 'type', 'default', 'contact', 'operate'] 
  tableLetterCanAdd: boolean = false
  editLetter: number = 0


  constructor(
    private tableService: TableService,
    public dialogRef: MatDialogRef<ListComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DataTable
  ) {     
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewLetter() {
    this.tableDetailDatas = [
      ...this.tableDetailDatas,
      {name: '', type: 'String', defaultValue: '', contact: ''}
    ]
    this.editLetter = this.tableDetailDatas.length - 1
  }

  startEdit(index: number, event: MouseEvent): void {
    console.log(index)
    event.preventDefault();
    event.stopPropagation();
    this.editLetter = index;
  }

  save( index: number ) {    
    
  }
  
  delete(index: number) {
    this.tableDetailDatas = this.tableDetailDatas.filter( (item,key) => index !== key)    
  }

  submitCreateTable() {
    console.log(this.tableDetailDatas)
    this.tableService.createNewTable(this.tableBasicInfo,this.tableDetailDatas)
  }
}