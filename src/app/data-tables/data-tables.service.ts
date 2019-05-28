import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DataTable, TableDetail } from  './interface'

interface Res {
  data:object;
  info:boolean;
  msg:string;
}

@Injectable({
  providedIn: 'root' 
}) 
export class TableService {

  private tablesInfoApi = '/api/Derived'
  private createTableApi = '/api/createTable'

  constructor(
    private http: HttpClient
  ) { }
  
  getTablesInfo():Observable<DataTable[]> {
    return this.http.get<Res>(this.tablesInfoApi)
      .pipe(              
        map( res => res.data as DataTable[] )        
      );
  }
  
  createNewTable( desc: any,  table:TableDetail[] ): any {
    const tableSchema = this.conversion(table)
    console.log(tableSchema)    
    return this.http.post(this.createTableApi,{      
      name: desc.name,
      name_zh: desc.name_zh,
      model: desc.ttype,
      structure:JSON.stringify(tableSchema)    
    }).subscribe(res => console.log(res))
  }

  conversion(table:TableDetail[] ) {
    const structure:object = {}
    for(let letter of table) {
      const key = letter.name
      const type = letter.type
      const defaultValue = letter.defaultValue
      structure[key] = {}
      structure[key].type = type
      defaultValue && (structure[key].default = defaultValue)
    }    
    return structure
  }
}
