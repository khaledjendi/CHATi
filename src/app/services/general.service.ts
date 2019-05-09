import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  version: string;
  navColor: string;
  constructor() { 
    this.version = environment.version;
    try {
      let ver_num = parseInt(this.version.replace(/\D/g, ''), 10);
      this.navColor = this.generateColor(ver_num);
    }catch {
      this.navColor = "#343a40";
    }
  }

  private generateColor(ver_num: number) {
    let colors: string[] = ['#343a40', '#2B4D29', '#54082A', '#051746', '#463305'];

    if(ver_num <= 5) {
      return colors[ver_num - 1];
    } else {
      let tmp_num = ver_num;
      while(tmp_num % 5 != 0) {
        tmp_num--;
      }
      return colors[ver_num - tmp_num];

    }
  }
}
