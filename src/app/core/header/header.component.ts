import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>()
  @Output() changeTheme = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }

  openSideNav() {
    this.toggle.emit()
  }

  onChange(check:boolean) {
    this.changeTheme.emit(check)
  }
}